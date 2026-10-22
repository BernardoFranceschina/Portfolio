<script setup lang="ts">
import { CLIQUES, SELFIE, SUETERES, CANSOU, QUASE } from '~/data/bonequinho'

/**
 * O bonequinho: caminha com o scroll, acena quando o cursor chega perto, cochila, acena
 * quando a pessoa volta para a aba, lê junto nos textos e tira as fotos (íris).
 * Clicado várias vezes seguidas, sorteia um easter egg (app/data/bonequinho.ts).
 * As classes de estado são trocadas direto no elemento para não re-renderizar a cada frame.
 */
const props = withDefaults(defineProps<{
  endMsg?: string
  /** seletor de uma coluna: se houver espaço, ele caminha ao lado dela em vez de por cima */
  besides?: string
  /** desmaiado (página de erro): deitado no chão, olhos em X, sem andar, falar nem reagir */
  fainted?: boolean
}>(), { endMsg: 'chegamos, valeu pelo passeio!', fainted: false })

const { speech, shooting, flashes, say, flash } = useWalker()

const root = ref<HTMLElement>()
const bubble = ref<HTMLElement>()
const pupils = ref<SVGGElement>()
const bubbleText = ref('')

let bubbleTimer: ReturnType<typeof setTimeout> | undefined
let bubbleW = 0 // largura do balão, medida quando o texto muda (para mantê-lo dentro da tela)
watch(speech, async ({ text, ms }) => {
  if (props.fainted) return
  bubbleText.value = text
  await nextTick()
  bubbleW = bubble.value?.offsetWidth ?? 0
  bubble.value?.classList.add('on')
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => bubble.value?.classList.remove('on'), ms)
})

watch(shooting, v => { if (!props.fainted) root.value?.classList.toggle('shooting', v) })
watch(flashes, () => {
  const W = root.value
  if (!W || props.fainted) return
  W.classList.remove('flashing'); void W.offsetWidth; W.classList.add('flashing')
  say('clique', 900)
})

const scared = ['ei!', 'opa', 'calma', 'para', 'ai', 'eita']
let si = 0

type Egg = 'selfie' | 'sueter' | 'cansa'
const EGGS: Egg[] = SELFIE.foto ? ['selfie', 'sueter', 'cansa'] : ['sueter', 'cansa']
const seen = new Set<Egg>()
let lastEgg: Egg | null = null
let streak = 0, lastClick = 0, busy = false
let sweater = 0
const selfieOn = ref(false)
const selfieLeft = ref(false)
let wakeUp = () => false // trocado no onMounted
const eggTimers: ReturnType<typeof setTimeout>[] = []
const later = (ms: number, fn: () => void) => { eggTimers.push(setTimeout(fn, ms)) }

function startle() {
  const W = root.value
  if (!W) return
  if (wakeUp()) return // dormindo: o clique só acorda
  if (W.classList.contains('sit')) { say('hmpf', 900); return } // sentado e emburrado: clique não adianta
  const now = Date.now()
  streak = now - lastClick < 1500 ? streak + 1 : 1
  lastClick = now
  if (streak >= CLIQUES && !busy && !W.classList.contains('walking') && !W.classList.contains('shooting')) { streak = 0; egg(W); return }
  W.classList.remove('jump'); void W.offsetWidth; W.classList.add('jump')
  say(streak === CLIQUES - 1 ? QUASE : scared[si++ % scared.length]!, 1000)
}

function egg(W: HTMLElement) {
  const fresh = EGGS.filter(e => !seen.has(e))
  const pool = fresh.length ? fresh : EGGS.filter(e => e !== lastEgg)
  const pick = pool[Math.floor(Math.random() * pool.length)]!
  seen.add(pick); lastEgg = pick
  busy = true
  if (pick === 'selfie') selfie(W)
  else if (pick === 'sueter') changeSweater(W)
  else sitDown(W)
}

/* selfie: levanta a câmera, flash, e uma polaroid com a foto cai ao lado dele; some sozinha ou quando rolar */
function selfie(W: HTMLElement) {
  W.classList.remove('wave', 'reading')
  shooting.value = true
  later(550, flash)
  later(850, () => {
    shooting.value = false
    selfieLeft.value = W.getBoundingClientRect().left > innerWidth - 300
    selfieOn.value = true
    later(500, () => say(SELFIE.fala, 1600))
    later(6000, dropSelfie)
  })
}
function dropSelfie() {
  if (!selfieOn.value) return
  selfieOn.value = false
  busy = false
}

/* suéter novo: some numa nuvenzinha e volta com outra cor, pelo resto da visita */
function changeSweater(W: HTMLElement) {
  W.classList.remove('puf'); void W.offsetWidth; W.classList.add('puf')
  later(260, () => {
    sweater = (sweater + 1 + Math.floor(Math.random() * (SUETERES.length - 1))) % SUETERES.length
    const c = SUETERES[sweater]!
    W.style.setProperty('--sw', c.cor); W.style.setProperty('--sw-hi', c.claro); W.style.setProperty('--sw-lo', c.escuro)
    W.style.setProperty('--sw-back', c.costas); W.style.setProperty('--sw-back-lo', c.costasEscuro)
  })
  later(700, () => { W.classList.remove('puf'); say(`${SUETERES[sweater]!.nome}, que tal?`, 1600); busy = false })
}

/* cansou: senta de braços cruzados; levanta quando a pessoa rola (ver standUp no onScroll) */
function sitDown(W: HTMLElement) {
  W.classList.remove('wave', 'reading', 'unsit')
  W.classList.add('sit')
  say(CANSOU.senta, 1600)
}
function standUp(W: HTMLElement) {
  W.classList.remove('sit', 'sleep')
  W.classList.add('unsit') // a subida usa a mesma transição lenta da descida
  later(500, () => W.classList.remove('unsit'))
  say(CANSOU.levanta, 1400)
  busy = false
}

onMounted(() => {
  if (props.fainted) return // desmaiado não anda, não pisca, não dorme, não segue o mouse
  const W = root.value!
  const q = (sel: string) => W.querySelector<SVGGElement>(sel)!
  const legA = q('.sleg.a'), legB = q('.sleg.b'), armA = q('.sarm.a'), armB = q('.sarm.b'), body = q('.bob')
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  const SPEED = .145 // px/ms (~145 px/s): velocidade máxima, a de uma caminhada
  const STRIDE = 72 // px andados por ciclo de passada: as pernas acompanham a distância, não o relógio
  let x = 24, targetX = 24, vx = 0, phase = 0, amp = 0
  let walking = false, stillSince = 0, scrolledAt = 0
  let lastFrame = performance.now(), lastInput = Date.now(), raf = 0
  let mouse: { x: number, y: number } | null = null
  let near = false, greetedAt = 0, saidEnd = false, leftAt = 0
  let readTimer: ReturnType<typeof setTimeout> | undefined
  let waveTimer: ReturnType<typeof setTimeout> | undefined

  // ao recarregar a página (F5) o navegador devolve o scroll sozinho: aí ele já aparece no lugar, sem atravessar a tela
  let restoring = true
  const settled = setTimeout(() => { restoring = false }, 1200)
  const userInput = () => { restoring = false }

  const prose = () => [...document.querySelectorAll('.notebook, .index-card, .reading-col, .cad-in')]
  // celular: não sobra margem ao lado dos papéis; em cima de um deles ele se abaixa e só espia
  const narrow = matchMedia('(max-width: 700px)')
  const PAPER = '.scrap, .notebook, .index-card, .rec-root, .extra, .cad-in, .sug, .postit, .postcard, .reading-col'
  let peekAt = 0
  const overProse = () => prose().some(p => { const r = p.getBoundingClientRect(); return r.top < innerHeight * .6 && r.bottom > innerHeight * .4 })

  /** devolve true se ele estava dormindo (aí acordar já é a reação) */
  function wake() {
    lastInput = Date.now()
    if (!W.classList.contains('sleep')) return false
    W.classList.remove('sleep'); say('não to dormindo não..', 1400)
    return true
  }
  wakeUp = wake
  // pulo e flash são animações de uma vez: tira a classe ao terminar
  const onAnimEnd = (e: AnimationEvent) => {
    if (e.animationName === 'walker-jump') W.classList.remove('jump')
    if (e.animationName === 'walker-flash') W.classList.remove('flashing')
  }
  W.addEventListener('animationend', onAnimEnd)

  function aim() {
    const max = document.documentElement.scrollHeight - innerHeight
    const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0
    let from = 24
    const col = props.besides ? document.querySelector(props.besides) : null
    if (col) { const r = col.getBoundingClientRect(); if (innerWidth - r.right > 220) from = r.right + 32 }
    targetX = from + p * (innerWidth - from - 88)
    return p
  }

  function onScroll() {
    const p = aim()
    scrolledAt = performance.now()
    if (restoring) { x = targetX; vx = 0; return }
    if (selfieOn.value) dropSelfie()
    // sentado, levantar já é a reação (sem o "tô acordado" por cima)
    if (W.classList.contains('sit')) { lastInput = Date.now(); standUp(W) }
    else wake()
    W.classList.remove('reading')
    // parou de rolar e ele já chegou: se tiver texto na tela, abre o livrinho
    clearTimeout(readTimer)
    readTimer = setTimeout(() => { if (!walking && overProse()) W.classList.add('reading') }, 300)
    if (p > .985 && !saidEnd) { saidEnd = true; setTimeout(() => say(props.endMsg, 2600), 400) }
  }

  // centro do desenho, calculado da posição (sem medir o DOM a cada quadro)
  const center = () => ({ x: x + 36, y: innerHeight - 60 })

  /* acenar: só parado e de mãos livres (andando o braço do aceno nem aparece; com a câmera, nunca) */
  function wave() {
    if (walking || W.classList.contains('shooting') || W.classList.contains('sit')) return false
    W.classList.remove('wave', 'reading'); void W.offsetWidth; W.classList.add('wave')
    clearTimeout(waveTimer)
    waveTimer = setTimeout(() => W.classList.remove('wave'), 1500)
    return true
  }

  /* o cursor chegou perto: ele olha e acena (uma vez por aproximação, sem repetir toda hora) */
  function onMouse(e: MouseEvent) {
    mouse = { x: e.clientX, y: e.clientY }
    const woke = wake()
    const c = center(), d = Math.hypot(mouse.x - c.x, mouse.y - c.y)
    if (d < 110 && !near) {
      near = true
      if (!woke && Date.now() - greetedAt > 8000 && wave()) { greetedAt = Date.now(); say('oi!', 1200) }
    }
    else if (d > 180) near = false
  }
  // cursor saiu da janela: para de seguir com os olhos
  const onLeave = (e: MouseEvent) => { if (!e.relatedTarget) mouse = null }

  function onVisibility() {
    if (document.hidden) { leftAt = Date.now(); return }
    // leftAt 0: a página abriu numa aba em segundo plano e está aparecendo pela primeira vez (ninguém "voltou")
    if (leftAt && Date.now() - leftAt > 1500) {
      W.classList.remove('sleep')
      say('bem-vind de volta!', 1800)
      wave()
    }
  }

  /* lendo, ele demora mais para dormir: a pessoa pode estar só lendo. Andando, fotografando ou no meio de
     um easter egg, nunca dorme (sentado emburrado pode cochilar) */
  const sleepTimer = setInterval(() => {
    const free = !walking && !W.classList.contains('shooting') && (!busy || W.classList.contains('sit'))
    if (free && Date.now() - lastInput > (W.classList.contains('reading') ? 40000 : 9000)) W.classList.add('sleep')
  }, 1000)
  const blinkTimer = setInterval(() => { W.classList.add('blink'); setTimeout(() => W.classList.remove('blink'), 140) }, 3800)

  function setWalking(on: boolean) {
    if (on === walking) return
    walking = on
    W.classList.toggle('walking', on)
    W.classList.toggle('idle', !on)
    if (on) W.classList.remove('reading', 'sleep')
    else if (performance.now() - scrolledAt > 250 && overProse()) W.classList.add('reading')
  }

  // só escreve no estilo quando muda: parado, o quadro não toca no DOM
  const last = new WeakMap<Element, string>()
  const put = (el: HTMLElement | SVGElement, t: string) => { if (last.get(el) !== t) { last.set(el, t); el.style.transform = t } }

  function frame() {
    const now = performance.now(), dt = Math.min(50, now - lastFrame)
    lastFrame = now
    const dx = targetX - x

    if (reduce) { x = targetX; vx = 0 }
    // fotografando, sentado ou levantando, ele fica parado no lugar; depois caminha até alcançar a posição
    else if (W.classList.contains('shooting') || W.classList.contains('sit') || W.classList.contains('unsit')) vx = 0
    else {
      // acelera e freia como gente: quer ir na velocidade proporcional à distância
      // longe demais (pulou de seção): apressa o passo, até ~2,5x
      const top = SPEED * Math.min(2.5, 1 + Math.abs(dx) / 300)
      const want = Math.max(-top, Math.min(top, dx * .004))
      vx += (want - vx) * Math.min(1, dt * .006)
      if (Math.abs(dx) < .5 && Math.abs(vx) < .01) { x = targetX; vx = 0 }
      x += vx * dt
      // nunca passa do ponto (passar e voltar parece tropeço)
      if ((dx > 0 && x > targetX) || (dx < 0 && x < targetX)) { x = targetX; vx = 0 }
    }

    // começa a andar com pouca velocidade e só para depois de um instante quieto (sem piscar entre os dois)
    const speed = Math.abs(vx)
    if (speed >= .012) stillSince = 0
    if (speed > .03) setWalking(true)
    else if (speed < .012) {
      if (!stillSince) stillSince = now
      if (now - stillSince > 140) setWalking(false)
    }
    if (walking && speed > .01) W.classList.toggle('flip', vx < 0)

    // passada: a fase anda com a distância percorrida; a amplitude cresce com a velocidade e some ao parar
    phase += (speed * dt / STRIDE) * Math.PI * 2
    amp += ((walking ? Math.min(1, speed / (SPEED * .55)) : 0) - amp) * Math.min(1, dt * .012)
    if (amp < .002) amp = 0
    const sw = Math.sin(phase)
    put(legA, `rotate(${(24 * amp * sw).toFixed(2)}deg)`)
    put(legB, `rotate(${(-24 * amp * sw).toFixed(2)}deg)`)
    put(armA, `rotate(${(-20 * amp * sw).toFixed(2)}deg)`)
    put(armB, `rotate(${(20 * amp * sw).toFixed(2)}deg)`)
    put(body, walking ? `translateY(${(-2 * amp * Math.abs(sw)).toFixed(2)}px)` : '')
    put(W, `translateX(${x.toFixed(2)}px)`)
    // falando (ou tocado, que faz ele falar) ele levanta; a cada 150 ms basta
    if (now - peekAt > 150) {
      peekAt = now
      const over = narrow.matches && !bubble.value?.classList.contains('on')
        && document.elementsFromPoint(x + 29, innerHeight - 30).some(e => e.closest(PAPER))
      W.classList.toggle('peek', over)
    }

    // balão: centrado na cabeça, mas empurrado para dentro quando ele está perto da borda da tela
    if (bubbleW && bubble.value?.classList.contains('on')) {
      const mid = x + 36, half = bubbleW / 2
      const shift = `${Math.max(8 + half - mid, Math.min(0, innerWidth - 8 - half - mid)).toFixed(1)}px`
      if (bubble.value.style.getPropertyValue('--bx') !== shift) bubble.value.style.setProperty('--bx', shift)
    }
    if (pupils.value) {
      let look = ''
      if (W.classList.contains('reading')) look = 'translate(0 1.6)'
      else if (mouse) {
        const c = center(), a = Math.atan2(mouse.y - c.y, mouse.x - c.x), dir = W.classList.contains('flip') ? -1 : 1
        look = `translate(${(Math.cos(a) * 1.4 * dir).toFixed(2)} ${(Math.sin(a) * 1.2).toFixed(2)})`
      }
      if (pupils.value.getAttribute('transform') !== look) pupils.value.setAttribute('transform', look)
    }
    raf = requestAnimationFrame(frame)
  }

  const onResize = () => { aim(); x = targetX }
  // a página cresce depois de carregar (fotos, fontes): reajusta o destino; durante a restauração do F5, já no lugar
  const grow = new ResizeObserver(() => { aim(); if (restoring) x = targetX })
  grow.observe(document.body)
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onResize)
  addEventListener('mousemove', onMouse)
  document.addEventListener('mouseout', onLeave)
  addEventListener('keydown', wake)
  document.addEventListener('visibilitychange', onVisibility)
  for (const ev of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) addEventListener(ev, userInput, { passive: true })
  aim(); x = targetX
  frame()

  onBeforeUnmount(() => {
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', onResize)
    removeEventListener('mousemove', onMouse)
    document.removeEventListener('mouseout', onLeave)
    removeEventListener('keydown', wake)
    document.removeEventListener('visibilitychange', onVisibility)
    for (const ev of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) removeEventListener(ev, userInput)
    clearInterval(sleepTimer); clearInterval(blinkTimer)
    clearTimeout(readTimer); clearTimeout(waveTimer); clearTimeout(bubbleTimer); clearTimeout(settled)
    eggTimers.forEach(clearTimeout)
    grow.disconnect()
    W.removeEventListener('animationend', onAnimEnd)
    cancelAnimationFrame(raf)
  })
})
</script>

<template>
  <div id="walker" ref="root" class="walker" :class="fainted ? 'fainted' : 'idle'">
    <div ref="bubble" class="bubble">{{ bubbleText }}</div>
    <span class="zzz" aria-hidden="true">z</span>
    <span class="flash" aria-hidden="true" />
    <span class="puff" aria-hidden="true"><i /><i /><i /><i /><i /></span>
    <!-- selfie: a polaroid que cai ao lado dele -->
    <Transition name="pol">
      <figure v-if="selfieOn" class="pol" :class="{ left: selfieLeft }">
        <Foto :id="SELFIE.foto!" sizes="106px" alt="selfie do Bernardo" />
        <figcaption>{{ SELFIE.legenda }}</figcaption>
      </figure>
    </Transition>
    <button
      type="button" class="clip" :disabled="fainted" @click="startle"
      :aria-label="fainted ? 'o Bernardo em miniatura, desmaiado' : 'o Bernardo em miniatura (dá pra clicar)'"
    >
      <!-- desenhado a partir de fotos: cabelo em cortina, bigode, piercing na sobrancelha,
           argola na orelha, suéter vinho, calça larga clara, tênis de camurça e a câmera no pescoço -->
      <svg class="av" viewBox="0 0 80 133" aria-hidden="true">
        <g class="bob">
          <g class="front">
          <!-- pernas: calça larga clara + tênis de camurça vinho -->
          <g class="leg a">
            <path d="M30.2 84 H39.6 L39.4 126 H29.6 Z" fill="#d9d7d0" />
            <path d="M35 88 L34.7 125" stroke="#bdbab1" stroke-width=".7" />
            <path d="M29.6 121 H39.4 V126 H29.6Z" fill="#cfccc4" />
            <rect x="27.6" y="124.6" width="12.8" height="5.4" rx="2.7" fill="#7c2932" />
            <path d="M31 126.4 l1.4 -.9 M33 126.4 l1.4 -.9" stroke="#f3eee6" stroke-width=".6" stroke-linecap="round" />
            <rect x="27.2" y="129.2" width="13.6" height="2.8" rx="1.4" fill="#f4f1ea" />
          </g>
          <g class="leg b">
            <path d="M40.4 84 H49.8 L50.4 126 H40.6 Z" fill="#e2e0d9" />
            <path d="M45 88 L45.3 125" stroke="#c6c3ba" stroke-width=".7" />
            <path d="M40.6 121 H50.4 V126 H40.6Z" fill="#d6d3cb" />
            <rect x="39.6" y="124.6" width="12.8" height="5.4" rx="2.7" fill="#8a2f38" />
            <path d="M43 126.4 l1.4 -.9 M45 126.4 l1.4 -.9" stroke="#f3eee6" stroke-width=".6" stroke-linecap="round" />
            <rect x="39.2" y="129.2" width="13.6" height="2.8" rx="1.4" fill="#fbf8f2" />
          </g>

          <!-- cabelo de trás (mais comprido na nuca) -->
          <path d="M34.2 38 H45.8 V43.6 C45.8 45.4 44.2 45.8 42.6 45.2 H37.4 C35.8 45.8 34.2 45.4 34.2 43.6Z" fill="#432e21" />
          <path d="M25.2 33.6 C23.8 20 28.8 8.6 40 8.6 C51.2 8.6 56.2 20 54.8 33.6 C54.5 36.4 52.8 36.8 52.2 34.6 L52 30 H28 L27.8 34.6 C27.2 36.8 25.5 36.4 25.2 33.6Z" fill="#4b3324" />

          <!-- pescoço -->
          <path d="M35.4 42 H44.6 V51 H35.4Z" fill="#e3b496" />
          <path d="M35.4 44.5 Q40 47 44.6 44.5 V46 Q40 48.5 35.4 46Z" fill="#d6a487" opacity=".7" />

          <!-- braço do aceno: atrás do suéter, para sair de dentro da manga -->
          <g class="arm-wave">
            <rect x="50.4" y="52.4" width="6.8" height="29.4" rx="3.4" style="fill: var(--sw-back)" />
            <path d="M50.4 78.4 H57.2 V80.6 C57.2 82 56.2 82.4 53.8 82.4 C51.4 82.4 50.4 82 50.4 80.6Z" style="fill: var(--sw-back-lo)" />
            <ellipse cx="53.8" cy="84" rx="2.9" ry="3.3" fill="#e9bc9c" />
          </g>

          <!-- suéter vinho com tricô -->
          <path d="M27.6 54.6 C28.6 50.8 32.6 49.4 35.8 49.4 H44.2 C47.4 49.4 51.4 50.8 52.4 54.6 L53.8 84.6 C53.9 86.6 52.4 87.6 50.6 87.6 H29.4 C27.6 87.6 26.1 86.6 26.2 84.6Z" style="fill: var(--sw)" />
          <path d="M33.5 56 c1 3 -1 6 0 9 s-1 6 0 9 s-1 6 0 9 M40 55 c1 3 -1 6 0 9 s-1 6 0 9 s-1 6 0 9 M46.5 56 c1 3 -1 6 0 9 s-1 6 0 9 s-1 6 0 9" style="stroke: var(--sw-hi)" stroke-width="1.1" fill="none" opacity=".75" />
          <path d="M26.4 83.6 H53.7 L53.8 85.2 C53.8 86.8 52.4 87.6 50.6 87.6 H29.4 C27.6 87.6 26.2 86.8 26.2 85.2Z" style="fill: var(--sw-lo)" />
          <path d="M34.4 49.8 Q40 55.2 45.6 49.8" style="stroke: var(--sw-lo)" stroke-width="2.4" fill="none" stroke-linecap="round" />
          <path d="M35.6 49.6 Q40 53.6 44.4 49.6" stroke="#f4f0e8" stroke-width=".9" fill="none" />

          <!-- sentado (cansou): pernas cruzadas para a frente -->
          <g class="sit-legs">
            <path d="M26 83 H54 C60.6 83 64.4 87.4 64.4 92.6 C64.4 97.6 60.8 100 55.4 99.4 H24.6 C19.2 100 15.6 97.6 15.6 92.6 C15.6 87.4 19.4 83 26 83Z" fill="#d9d7d0" />
            <path d="M40 86 V98" stroke="#c4c1b8" stroke-width=".7" />
            <rect x="29.4" y="95.2" width="10.6" height="5" rx="2.5" fill="#7c2932" />
            <rect x="40" y="95.2" width="10.6" height="5" rx="2.5" fill="#8a2f38" />
          </g>

          <!-- câmera pendurada no pescoço -->
          <g class="cam-idle">
            <path d="M35.2 51.2 L37.6 63.4 M44.8 51.2 L42.4 63.4" stroke="#1f1f24" stroke-width=".9" />
            <rect x="34.6" y="62.6" width="10.8" height="7" rx="1.4" fill="#2b2b31" />
            <rect x="36" y="61.4" width="3.4" height="1.6" rx=".5" fill="#3a3a40" />
            <circle cx="40" cy="66.1" r="2.3" fill="#141418" stroke="#8b8b93" stroke-width=".7" />
            <circle cx="39.3" cy="65.4" r=".6" fill="#9fb6c9" />
          </g>

          <!-- braços -->
          <g class="arm l">
            <rect x="22.8" y="52.4" width="6.8" height="29.4" rx="3.4" style="fill: var(--sw)" />
            <path d="M22.8 78.4 H29.6 V80.6 C29.6 82 28.6 82.4 26.2 82.4 C23.8 82.4 22.8 82 22.8 80.6Z" style="fill: var(--sw-lo)" />
            <ellipse cx="26.2" cy="84" rx="2.9" ry="3.3" fill="#e9bc9c" />
          </g>
          <g class="arm r">
            <rect x="50.4" y="52.4" width="6.8" height="29.4" rx="3.4" style="fill: var(--sw)" />
            <path d="M50.4 78.4 H57.2 V80.6 C57.2 82 56.2 82.4 53.8 82.4 C51.4 82.4 50.4 82 50.4 80.6Z" style="fill: var(--sw-lo)" />
            <ellipse cx="53.8" cy="84" rx="2.9" ry="3.3" fill="#e9bc9c" />
          </g>

          <!-- braços cruzados (cansou) -->
          <g class="arms-x">
            <!-- braços colados ao corpo até o cotovelo; antebraços cruzados na altura do peito.
                 Sem atributo transform: com transform-box: fill-box ele giraria em volta do canto e desalinharia -->
            <rect x="22.8" y="52.4" width="6.8" height="16" rx="3.4" style="fill: var(--sw)" />
            <rect x="50.4" y="52.4" width="6.8" height="16" rx="3.4" style="fill: var(--sw)" />
            <path d="M53.8 65.4 L26.6 60.2" stroke-width="6.8" stroke-linecap="round" style="stroke: var(--sw-lo)" />
            <ellipse cx="25.2" cy="59.6" rx="2.6" ry="2.9" fill="#e9bc9c" />
            <path d="M26.2 65.4 L53.4 60.2" stroke-width="6.8" stroke-linecap="round" style="stroke: var(--sw)" />
            <ellipse cx="54.8" cy="59.6" rx="2.6" ry="2.9" fill="#e9bc9c" />
          </g>

          <!-- livrinho (lendo junto) -->
          <g class="book">
            <path d="M26.2 55 L24.4 69 Q24.2 71.6 27 71 L30 69" style="stroke: var(--sw)" stroke-width="6.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M53.8 55 L55.6 69 Q55.8 71.6 53 71 L50 69" style="stroke: var(--sw)" stroke-width="6.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="30.6" y="59.6" width="18.8" height="13.4" rx="1.4" fill="#c4553a" />
            <path d="M40 59.6 v13.4" stroke="#8f3a26" stroke-width="1.1" />
            <path d="M32.4 62.4 h5.6 M32.4 64.6 h5.6 M42 62.4 h5.6 M42 64.6 h4" stroke="#e8a48f" stroke-width=".6" />
            <ellipse cx="30.4" cy="68" rx="2.5" ry="2.9" fill="#e9bc9c" />
            <ellipse cx="49.6" cy="68" rx="2.5" ry="2.9" fill="#e9bc9c" />
          </g>

          <!-- orelhas + argola -->
          <ellipse cx="27.3" cy="31" rx="2.3" ry="3.6" fill="#e4b394" />
          <ellipse cx="52.7" cy="31" rx="2.3" ry="3.6" fill="#e4b394" />
          <circle cx="53.4" cy="35.4" r="1.5" fill="none" stroke="#d4d6db" stroke-width=".7" />

          <!-- rosto -->
          <path d="M27.6 28 C27.6 18.4 33 14 40 14 C47 14 52.4 18.4 52.4 28 C52.4 37.6 48 45.4 40 45.8 C32 45.4 27.6 37.6 27.6 28Z" fill="#efc6a7" />
          <ellipse cx="40" cy="43.2" rx="6.2" ry="2.8" fill="#b88a70" opacity=".22" />
          <ellipse cx="32.4" cy="34.2" rx="2.6" ry="1.6" fill="#e8998a" opacity=".35" />
          <ellipse cx="47.6" cy="34.2" rx="2.6" ry="1.6" fill="#e8998a" opacity=".35" />

          <!-- olhos -->
          <g ref="pupils" class="pupils">
            <ellipse cx="34.8" cy="28.2" rx="1.35" ry="1.15" fill="#3b2a20" />
            <ellipse cx="45.2" cy="28.2" rx="1.35" ry="1.15" fill="#3b2a20" />
            <circle cx="35.2" cy="27.8" r=".35" fill="#fff" opacity=".8" />
            <circle cx="45.6" cy="27.8" r=".35" fill="#fff" opacity=".8" />
          </g>
          <g class="ko">
            <path d="M33.4 26.8 L36.2 29.6 M36.2 26.8 L33.4 29.6 M43.8 26.8 L46.6 29.6 M46.6 26.8 L43.8 29.6" stroke="#3b2a20" stroke-width=".95" stroke-linecap="round" />
          </g>
          <g class="lid">
            <path d="M33 28.4 Q34.8 29.4 36.6 28.4" stroke="#3b2a20" stroke-width=".9" fill="none" stroke-linecap="round" />
            <path d="M43.4 28.4 Q45.2 29.4 47 28.4" stroke="#3b2a20" stroke-width=".9" fill="none" stroke-linecap="round" />
          </g>

          <!-- nariz, bigode chevron, boca, pinta -->
          <path d="M40.4 28.8 Q39.4 33 38.8 34.4 Q40 35.3 41.6 34.6" stroke="#c99377" stroke-width=".8" fill="none" stroke-linecap="round" />
          <path d="M33.6 38.8 C34.8 36.2 37.6 35.5 40 36.5 C42.4 35.5 45.2 36.2 46.4 38.8 C45.8 39.6 44.2 39.2 42.8 38.8 C41.8 38.5 40.9 38.7 40 39.1 C39.1 38.7 38.2 38.5 37.2 38.8 C35.8 39.2 34.2 39.6 33.6 38.8Z" fill="#6b4630" />
          <path d="M37.8 41 Q40 41.9 42.2 41" stroke="#b5756a" stroke-width=".85" fill="none" stroke-linecap="round" />
          <circle cx="33.2" cy="37.4" r=".5" fill="#6b4630" />

          <!-- cabelo da frente: risca quase no meio, volume em cima e mechas em cortina caindo nas têmporas -->
          <path d="M25.4 27 C23.6 16.4 27.8 9.4 34.8 8 C38 7.3 41.8 7.4 44.6 8.2 C51.6 10 56.6 16 54.6 27 C52.8 19.6 48.6 15.2 42.8 14.2 L40.6 15 L38.4 14.2 C32 15 27.6 19.4 25.4 27Z" fill="#4b3324" />
          <path d="M40.2 13.4 C35.4 12.8 29.6 15.4 27.4 22.4 C26.6 25.4 26.8 29.4 27.8 33 C28.4 27.6 30 23.2 33.4 20.6 C35.8 18.8 38.6 16.8 40.2 14.4Z" fill="#553a29" />
          <path d="M40.8 13.4 C45.6 12.8 51.2 15.6 53 22.6 C53.6 25.6 53.4 29.4 52.4 33 C51.8 27.6 50.2 23.4 46.8 20.8 C44.4 19 42 16.8 40.8 14.4Z" fill="#553a29" />
          <path d="M39.6 14 C38 15.8 36.8 17.6 36.2 19.4" stroke="#4b3324" stroke-width="1.3" fill="none" stroke-linecap="round" />
          <path d="M41.4 14 C42.8 15.6 43.8 17.2 44.4 19" stroke="#4b3324" stroke-width="1.1" fill="none" stroke-linecap="round" />
          <path d="M33.6 9.6 C30.6 11 28.4 14 27.6 18.4 M46.4 9.8 C49.6 11.4 51.6 14.4 52.4 18.6 M37.4 8.6 C34.6 9.6 32.2 11.6 30.8 14.6 M42.6 8.8 C45.4 9.6 47.6 11.4 48.8 14" stroke="#7d5a40" stroke-width=".75" fill="none" stroke-linecap="round" />

          <!-- sobrancelhas grossas + piercing -->
          <path d="M31.8 24.8 Q34.6 23 37.6 24.4" stroke="#4b3324" stroke-width="1.7" fill="none" stroke-linecap="round" />
          <path d="M42.4 24.4 Q45.4 23 48.2 24.8" stroke="#4b3324" stroke-width="1.7" fill="none" stroke-linecap="round" />
          <circle cx="46.3" cy="22.5" r=".65" fill="#e6e8ec" />
          <circle cx="47.7" cy="25.9" r=".65" fill="#e6e8ec" />

          <!-- câmera levantada (na hora da íris) -->
          <g class="cam">
            <path d="M27 55 L20.6 46.4 Q19 43.6 21.4 41.6 L27.4 34.6" style="stroke: var(--sw)" stroke-width="6.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M53 55 L59.4 46.4 Q61 43.6 58.6 41.6 L52.6 34.6" style="stroke: var(--sw)" stroke-width="6.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <ellipse cx="28.6" cy="31" rx="3" ry="3.6" fill="#e9bc9c" />
            <ellipse cx="51.4" cy="31" rx="3" ry="3.6" fill="#e9bc9c" />
            <rect x="33" y="19.6" width="6" height="3.2" rx=".8" fill="#3a3a40" />
            <rect x="29.6" y="22.2" width="20.8" height="12.4" rx="2.2" fill="#2b2b31" />
            <rect x="45.2" y="23.6" width="3.4" height="2" rx=".6" fill="#d9d9d9" />
            <circle cx="40" cy="28" r="4.6" fill="#141418" stroke="#8b8b93" stroke-width="1.1" />
            <circle cx="38.7" cy="26.7" r="1.2" fill="#9fb6c9" />
          </g>
          </g>

          <!-- de perfil, só enquanto caminha: passada de verdade, braços para frente e para trás -->
          <g class="side">
            <!-- perna e braço de trás (mais escuros) -->
            <g class="sleg b">
              <path d="M36 84 H45 L45.2 125.4 H35.8Z" fill="#c9c6be" />
              <path d="M34.6 124.6 H46.6 C48.6 124.6 49.8 126.2 49.8 128 V129.6 H34.6Z" fill="#6e232b" />
              <rect x="34.2" y="129" width="16" height="2.8" rx="1.4" fill="#e8e4dc" />
            </g>
            <g class="sarm b">
              <rect x="37.2" y="52.6" width="6.6" height="29.2" rx="3.3" style="fill: var(--sw-back)" />
              <ellipse cx="40.5" cy="83.6" rx="2.8" ry="3.2" fill="#dcae8e" />
            </g>

            <!-- pescoço, nuca e suéter -->
            <path d="M37.2 41 H44.4 V51 H37.2Z" fill="#e3b496" />
            <path d="M32.4 54.2 C33 50.6 36 49.4 39.6 49.4 H43 C46.6 49.4 49.4 51.4 49.8 55 L50.6 84.6 C50.6 86.6 49.4 87.6 47.6 87.6 H33.6 C31.8 87.6 30.8 86.6 30.8 84.6Z" style="fill: var(--sw)" />
            <path d="M36.6 56 c1 3 -1 6 0 9 s-1 6 0 9 s-1 6 0 9 M44.2 56 c1 3 -1 6 0 9 s-1 6 0 9 s-1 6 0 9" style="stroke: var(--sw-hi)" stroke-width="1.1" fill="none" opacity=".75" />
            <path d="M30.9 83.6 H50.5 L50.6 85.2 C50.6 86.8 49.4 87.6 47.6 87.6 H33.6 C31.8 87.6 30.8 86.8 30.8 85.2Z" style="fill: var(--sw-lo)" />
            <path d="M39 49.6 Q43 51.6 46.6 50.4" style="stroke: var(--sw-lo)" stroke-width="2.2" fill="none" stroke-linecap="round" />

            <!-- câmera pendurada, de lado -->
            <path d="M41.2 50.4 L48.6 61.6" stroke="#1f1f24" stroke-width=".9" />
            <rect x="45.4" y="61" width="6.2" height="7.2" rx="1.2" fill="#2b2b31" />
            <rect x="51.4" y="62.2" width="2.8" height="4.8" rx=".8" fill="#141418" stroke="#8b8b93" stroke-width=".5" />

            <!-- perna da frente -->
            <g class="sleg a">
              <path d="M36 84 H45 L45.2 125.4 H35.8Z" fill="#dedcd5" />
              <path d="M40.6 88 L40.6 124" stroke="#c4c1b8" stroke-width=".7" />
              <path d="M34.6 124.6 H46.6 C48.6 124.6 49.8 126.2 49.8 128 V129.6 H34.6Z" fill="#8a2f38" />
              <path d="M40.4 126 l1.6 -.9 M42.6 126 l1.6 -.9" stroke="#f3eee6" stroke-width=".6" stroke-linecap="round" />
              <rect x="34.2" y="129" width="16" height="2.8" rx="1.4" fill="#fbf8f2" />
            </g>

            <!-- cabeça de perfil -->
            <path d="M28 33 C26.4 20 33 13.6 41.2 13.6 C47.8 13.6 52 17.6 52.8 24 L53 27 L55.4 32.4 C55.6 33 55 33.4 54 33.4 L52.6 33.6 L52.8 36 C53 37.6 52.4 38.6 51.6 39.6 L51.8 41.4 C51 44.4 47.6 46 43.6 45.8 C37.6 45.4 30.4 41.8 28 33Z" fill="#efc6a7" />
            <path d="M43 44.6 C46.4 45.2 50 44 51.4 41.4 L51.6 39.8 C49 41.6 45.6 42.6 43 42.4Z" fill="#b88a70" opacity=".25" />
            <ellipse cx="46.4" cy="35" rx="2.4" ry="1.5" fill="#e8998a" opacity=".35" />
            <!-- cabelo: franja caindo para a frente, mais comprido na nuca -->
            <path d="M28.6 31 C26.6 18.6 32.4 9.4 41.6 9.4 C49 9.6 54.4 14.2 53.8 21.4 C52 19.2 49.6 18.4 47.4 18.6 C48 20.6 47.8 22.6 47 24.4 C45.6 21.8 43.4 20.4 41 20.2 C39.6 21.8 38.2 23.4 36.4 24.6 C35 26 34.6 28 35 30.4 C35.4 33.4 35.2 36.8 34.4 39.6 C33.6 41.8 31.2 42 30.2 40 C29 37.4 28.6 34.2 28.6 31Z" fill="#4b3324" />
            <path d="M33 12 C38.4 10.2 46 10.8 50.8 14.8 M30.4 16.4 C33.6 13.8 38.4 13 42.4 13.8 M29.6 22 C30.4 18.8 32.4 16.4 35.4 15.2 M30.8 30 C30.4 26.4 31 23.6 32.6 21.4 M46.4 13.8 C48.4 15.6 49.4 17.4 49.6 19.4" stroke="#7d5a40" stroke-width=".75" fill="none" stroke-linecap="round" />
            <!-- orelha, argola, sobrancelha com piercing, olho -->
            <ellipse cx="38.6" cy="31.2" rx="2.4" ry="3.6" fill="#e4b394" />
            <path d="M38 29.6 Q39.4 30.6 38.6 32.6" stroke="#cf9a7c" stroke-width=".6" fill="none" />
            <circle cx="38.8" cy="35.6" r="1.5" fill="none" stroke="#d4d6db" stroke-width=".7" />
            <path d="M46.2 25.4 Q48.6 24 51 25.2" stroke="#4b3324" stroke-width="1.6" fill="none" stroke-linecap="round" />
            <circle cx="49.8" cy="23.7" r=".6" fill="#e6e8ec" />
            <circle cx="50.8" cy="26.4" r=".6" fill="#e6e8ec" />
            <ellipse class="seye" cx="49.2" cy="28.8" rx="1.1" ry="1.2" fill="#3b2a20" />
            <path class="slid" d="M47.8 29 Q49.2 29.8 50.6 29" stroke="#3b2a20" stroke-width=".9" fill="none" stroke-linecap="round" />
            <!-- bigode e boca -->
            <path d="M46.8 35.8 C48.6 34.4 51.8 33.8 54.4 34.4 C54.8 35.4 54.2 36.4 52.8 36.6 C51.2 36.8 49.8 36.6 48.4 37.2 C47.4 37.4 46.6 36.8 46.8 35.8Z" fill="#6b4630" />
            <path d="M51.2 38.8 L52.8 38.6" stroke="#b5756a" stroke-width=".8" stroke-linecap="round" />

            <!-- braço da frente -->
            <g class="sarm a">
              <rect x="37.2" y="52.6" width="6.6" height="29.2" rx="3.3" style="fill: var(--sw)" />
              <path d="M37.2 78.4 H43.8 V80.6 C43.8 82 42.8 82.4 40.5 82.4 C38.2 82.4 37.2 82 37.2 80.6Z" style="fill: var(--sw-lo)" />
              <ellipse cx="40.5" cy="84" rx="2.9" ry="3.3" fill="#e9bc9c" />
            </g>
          </g>
        </g>
      </svg>
    </button>
  </div>
</template>

<style>
.walker { position: fixed; bottom: 0; left: 0; z-index: 8; width: 72px; will-change: transform;
  --sw: #8c2a30; --sw-hi: #a23a40; --sw-lo: #74212a; --sw-back: #7e252b; --sw-back-lo: #6a1d24; }
.walker .clip { display: block; width: 72px; height: 120px; overflow: hidden; position: relative; cursor: pointer; padding: 0; border: 0; background: none; font: inherit; color: inherit; }
.walker .clip:focus-visible { outline: 2px dashed #fff; outline-offset: 4px; border-radius: 6px; }
.walker .av { width: 72px; height: 120px; display: block; transition: transform .35s cubic-bezier(.5,1.6,.5,1); transform-origin: 50% 100%; }
.walker.flip .av { transform: scaleX(-1); }
.walker.jump .clip { animation: walker-jump .5s cubic-bezier(.3,1.6,.6,1); overflow: visible; }
@keyframes walker-jump { 40% { transform: translateY(-34px); } }
.walker .av * { transform-box: fill-box; }
/* parado fica de frente; andando vira de perfil (o "flip" espelha quando ele volta) */
/* a virada: o corpo de frente "achata" enquanto o de perfil abre, como se ele girasse no lugar */
.walker .front, .walker .side { transform-origin: 50% 50%; transition: opacity .14s ease, transform .24s cubic-bezier(.4,1.3,.5,1); }
.walker .side { opacity: 0; transform: scaleX(.3); }
.walker.walking:not(.shooting) .side { opacity: 1; transform: none; }
.walker.walking:not(.shooting) .front { opacity: 0; transform: scaleX(.3); }
.walker .sleg, .walker .sarm { transform-origin: 50% 3%; } /* a passada é desenhada pelo script, no ritmo do passo */
.walker .slid { opacity: 0; }
.walker.blink .slid { opacity: 1; }
.walker.blink .seye { opacity: 0; }
.walker .leg { transform-origin: 50% 0; }
.walker .arm.l { transform-origin: 30% 4%; }
.walker.idle .bob { animation: walker-breathe 3s infinite ease-in-out; }
@keyframes walker-breathe { 50% { transform: translateY(1px); } }
.walker .arm-wave { opacity: 0; transform-origin: 50% 6%; }
/* acenar: o braço normal some e o de trás sobe a partir do ombro, balançando a mão */
.walker.wave .arm.r { opacity: 0; }
.walker.wave .arm-wave { opacity: 1; animation: walker-wave 1.5s ease-in-out; }
@keyframes walker-wave {
  0%, 100% { transform: none; }
  15%, 35%, 55%, 75% { transform: rotate(-145deg); }
  25%, 45%, 65% { transform: rotate(-120deg); }
  85% { transform: rotate(-150deg); }
}
/* sentado de braços cruzados */
.walker .sit-legs, .walker .arms-x { opacity: 0; transition: opacity .2s ease; }
/* descer e subir devagar, como gente: as pernas trocam no meio do movimento e os braços cruzam por último */
.walker.sit .front, .walker.unsit .front { transition: opacity .14s ease, transform .5s cubic-bezier(.45,0,.25,1); }
.walker.sit .front { transform: translateY(30px); }
.walker.sit .leg { transition-delay: .12s; }
.walker.sit .sit-legs { transition-delay: .15s; }
.walker.sit .arms-x { transition-delay: .32s; }
/* com a câmera na mão (íris ou selfie) ninguém cruza os braços: nunca mais de dois braços */
.walker.shooting .arms-x { opacity: 0; transition-delay: 0s; }
.walker.sit .leg, .walker.sit .arm, .walker.sit .cam-idle, .walker.sit .book { opacity: 0; }
.walker.sit .sit-legs, .walker.sit .arms-x { opacity: 1; }
.walker.sit .bob { animation: walker-breathe 2.6s infinite ease-in-out; }
.walker.sit .side { opacity: 0; }
/* puf da troca de suéter */
.walker .puff { position: absolute; left: 36px; bottom: 50px; width: 0; height: 0; pointer-events: none; z-index: 2; }
.walker .puff i { position: absolute; width: 34px; height: 34px; margin: -17px; border-radius: 50%; background: #f4f1ea; opacity: 0; box-shadow: 0 2px 6px rgba(0,0,0,.15); }
.walker.puf .puff i { animation: walker-puf .7s ease-out; }
.walker.puf .puff i:nth-child(1) { --dx: -22px; --dy: -30px; }
.walker.puf .puff i:nth-child(2) { --dx: 20px; --dy: -36px; animation-delay: .04s; }
.walker.puf .puff i:nth-child(3) { --dx: -18px; --dy: 12px; animation-delay: .08s; }
.walker.puf .puff i:nth-child(4) { --dx: 22px; --dy: 8px; animation-delay: .02s; }
.walker.puf .puff i:nth-child(5) { --dx: 0px; --dy: -8px; width: 52px; height: 52px; margin: -26px; }
@keyframes walker-puf { 0% { opacity: 0; transform: translate(0, 0) scale(.3); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.3); } }
.walker.puf .av { animation: walker-puf-body .7s ease-in-out; }
@keyframes walker-puf-body { 0%, 100% { opacity: 1; } 30%, 55% { opacity: 0; } }
/* polaroid da selfie */
.walker .pol { position: absolute; left: 84px; bottom: 24px; width: 120px; margin: 0; padding: 7px 7px 26px; background: #fff; box-shadow: 0 10px 20px -8px rgba(0,0,0,.5); transform: rotate(-5deg); pointer-events: none; }
.walker .pol.left { left: auto; right: 84px; transform: rotate(5deg); }
.walker .pol img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
.walker .pol figcaption { position: absolute; left: 9px; bottom: 3px; font-family: "Caveat", cursive; font-size: 19px; color: var(--pencil); }
.pol-enter-active { transition: transform .5s cubic-bezier(.3,1.5,.5,1), opacity .2s; }
.pol-leave-active { transition: transform .6s ease-in, opacity .6s ease-in; }
.pol-enter-from { opacity: 0; transform: translateY(-60px) rotate(-18deg) !important; }
.pol-leave-to { opacity: 0; transform: translateY(60px) rotate(12deg) !important; }
.walker .lid { opacity: 0; }
/* desmaiado (página de erro): deitado de costas no chão, olhos em X, parado */
.walker .ko { opacity: 0; }
.walker.fainted { left: 28px; }
.walker.fainted .clip { overflow: visible; cursor: default; }
.walker.fainted .av { transform-origin: 50% 100%; transform: translate(100px, -26px) rotate(-90deg); }
.walker.fainted .ko { opacity: 1; }
.walker.fainted .pupils, .walker.fainted .lid, .walker.fainted .side, .walker.fainted .arm-wave, .walker.fainted .cam, .walker.fainted .book,
.walker.fainted .sit-legs, .walker.fainted .arms-x, .walker.fainted .bubble, .walker.fainted .zzz { opacity: 0; }
.walker.sleep .lid, .walker.blink .lid { opacity: 1; }
.walker.sleep .pupils { opacity: 0; }
.walker.sleep .bob { animation: walker-breathe 2.2s infinite ease-in-out; }
.walker .book { opacity: 0; transition: opacity .3s; }
.walker .arm, .walker .leg { transition: opacity .18s ease; }
.walker.reading .book { opacity: 1; }
.walker.reading .arm { opacity: 0; }
.walker .cam { opacity: 0; transform: translateY(6px); transition: opacity .2s, transform .25s cubic-bezier(.4,1.6,.5,1); }
.walker.shooting .cam { opacity: 1; transform: none; }
.walker.shooting .bob { animation: none; }
/* nunca acena com a câmera na mão */
.walker.shooting .arm-wave { opacity: 0; animation: none; }
.walker.shooting.wave .arm.r { opacity: 0; }
.walker.shooting .arm, .walker.shooting .book, .walker.shooting .cam-idle, .walker.reading .cam-idle { opacity: 0; }
.walker .cam-idle { transition: opacity .2s; }
.walker .flash { position: absolute; left: 36px; bottom: 94.7px; width: 10px; height: 10px; margin: -5px; border-radius: 50%; background: #fff; opacity: 0; pointer-events: none; }
.walker.flashing .flash { animation: walker-flash .5s ease-out; }
@keyframes walker-flash { 0% { opacity: 1; box-shadow: 0 0 0 0 #fff; } 30% { opacity: 1; box-shadow: 0 0 40px 30px rgba(255,255,255,.9); } 100% { opacity: 0; box-shadow: 0 0 80px 60px rgba(255,255,255,0); } }
.walker .bubble { position: absolute; bottom: 124px; left: 50%; transform: translateX(calc(-50% + var(--bx, 0px))) scale(.6); opacity: 0; background: var(--paper); padding: 2px 10px; border-radius: 10px; white-space: nowrap; font-family: "Caveat", cursive; font-size: 22px; transition: .25s cubic-bezier(.4,1.6,.5,1); pointer-events: none; box-shadow: 0 4px 14px -6px rgba(0,0,0,.4); }
.walker .bubble::after { content: ""; position: absolute; left: calc(50% - var(--bx, 0px)); bottom: -5px; width: 10px; height: 10px; background: var(--paper); transform: translateX(-50%) rotate(45deg); }
.walker .bubble.on { opacity: 1; transform: translateX(calc(-50% + var(--bx, 0px))) scale(1); }
.walker .zzz { position: absolute; bottom: 108px; left: 48px; font-family: "Caveat", cursive; color: #fff; opacity: 0; font-size: 22px; }
.walker.sleep .zzz { animation: walker-z 2.4s infinite; }
@keyframes walker-z { 0% { opacity: 0; transform: translate(0,0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(14px,-26px); } }

/* celular: um pouco menor e, em cima de um papel, abaixado até a cabeça (o texto fica livre) */
@media (max-width: 700px) {
  .walker { scale: .8; transform-origin: 0 100%; transition: translate .35s cubic-bezier(.4,0,.3,1); }
  .walker.peek { translate: 0 74px; }
}
@media (prefers-reduced-motion: reduce) {
  .walker *, .walker .av { animation: none !important; transition: none !important; }
}
</style>
