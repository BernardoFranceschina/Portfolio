<script setup lang="ts">
/**
 * Fotos fixas no fundo. Cada bloco da página com data-shot="n" puxa a foto n.
 * A troca é uma íris: a foto nova abre num círculo a partir da lente da câmera
 * do bonequinho, presa ao scroll, e termina com um flash.
 * Easter egg: quando o bonequinho pede (vários cliques nele), a foto secreta abre do mesmo jeito e fica até a próxima rolagem.
 */
import { FOTO_SECRETA } from '~/data/varal'

const props = defineProps<{ photos: string[] }>()

const { shooting, flash, secrets, say } = useWalker()
const shots = ref<HTMLElement[]>([])
const edge1 = ref<SVGCircleElement>()
const edge2 = ref<SVGCircleElement>()
const edgeSvg = ref<SVGSVGElement>()
const current = ref(0)
const secretEl = ref<HTMLElement>()
const secretOn = ref(false)
// só a primeira foto entra na carga inicial; as outras (e a secreta) vêm depois que a página carregou ou na primeira rolagem
const ready = ref(false)

onMounted(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  // o primeiro bloco de cada foto é o que dispara a troca
  const firsts: { k: number, el: Element }[] = []
  document.querySelectorAll('[data-shot]').forEach((el) => {
    const k = Number((el as HTMLElement).dataset.shot)
    if (!firsts.some(f => f.k === k)) firsts.push({ k, el })
  })
  const lastP: number[] = []
  let ticking = false
  let readyTimer: ReturnType<typeof setTimeout> | undefined
  const fetchRest = () => { ready.value = true }
  const onLoad = () => { readyTimer = setTimeout(fetchRest, 300) }
  if (document.readyState === 'complete') onLoad()
  else addEventListener('load', onLoad, { once: true })

  // a íris sai da lente da câmera do bonequinho
  function lens() {
    const ar = document.querySelector('#walker .av')?.getBoundingClientRect()
    const cx = ar ? ar.left + ar.width / 2 : innerWidth / 2
    const cy = ar ? ar.top + ar.height * (28 / 133) : innerHeight // altura da lente no desenho do avatar
    return { cx, cy, far: Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) * 1.15 }
  }
  function edges(cx: number, cy: number, R: number, k: number) {
    for (const c of [edge1.value, edge2.value]) {
      c?.setAttribute('cx', String(cx)); c?.setAttribute('cy', String(cy)); c?.setAttribute('r', String(R))
    }
    if (edgeSvg.value) edgeSvg.value.style.opacity = String(Math.min(1, k * 6, (1 - k) * 6))
  }

  /* foto secreta: ele levanta a câmera, a íris abre sozinha (sem depender do scroll), flash e um comentário */
  let secretBusy = false, secretAt = 0, secretRaf = 0, secretTimer: ReturnType<typeof setTimeout> | undefined
  watch(secrets, () => {
    const el = secretEl.value
    if (!el || secretBusy) return
    fetchRest()
    secretBusy = true
    shooting.value = true
    secretTimer = setTimeout(() => {
      const { cx, cy, far } = lens()
      el.style.transition = 'none'; el.style.opacity = '1'; el.style.visibility = 'visible'
      const t0 = performance.now(), DUR = reduce ? 1 : 1100
      const step = () => {
        const k = Math.min(1, (performance.now() - t0) / DUR), e = 1 - (1 - k) ** 3, R = Math.max(2, e * far)
        el.style.clipPath = `circle(${R.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`
        if (!reduce) edges(cx, cy, R, k)
        if (k < 1) { secretRaf = requestAnimationFrame(step); return }
        el.style.clipPath = ''
        secretBusy = false; secretOn.value = true; secretAt = performance.now()
        shooting.value = false
        flash()
        secretTimer = setTimeout(() => say(FOTO_SECRETA.fala, 2200), 1000)
      }
      step()
    }, 450) // tempo de levantar a câmera
  })
  // rolou a página: a foto secreta vai embora devagar e o fundo volta a seguir o scroll
  function hideSecret() {
    const el = secretEl.value
    if (!el || !secretOn.value || performance.now() - secretAt < 400) return
    secretOn.value = false
    el.style.transition = 'opacity .7s ease'; el.style.opacity = '0'
    secretTimer = setTimeout(() => { el.style.visibility = 'hidden' }, 700)
  }

  function paint() {
    ticking = false
    const vh = innerHeight, D = vh * .7
    const reveal = props.photos.map(() => 0)
    reveal[0] = 1
    firsts.forEach((f, i) => {
      if (i === 0) return
      const r = f.el.getBoundingClientRect()
      const c = r.top + Math.min(r.height, vh) / 2 - vh / 2
      // começa quando o bloco entra por baixo e termina quando chega ao meio da tela
      reveal[f.k] = Math.max(0, Math.min(1, 1 - c / D))
    })

    const { cx, cy, far } = lens()

    let active = -1, activeP = 0
    shots.value.forEach((s, k) => {
      const p = reveal[k]!
      s.style.clipPath = ''
      s.style.visibility = p > 0 ? 'visible' : 'hidden'
      if (p > 0 && p < 1) { active = k; activeP = p }
      if ((lastP[k] ?? 1) < 1 && p >= 1 && k > 0) flash()
      lastP[k] = p
    })

    if (active >= 0 && !reduce) {
      const R = Math.max(2, activeP * far)
      shots.value[active]!.style.clipPath = `circle(${R.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`
      edges(cx, cy, R, activeP)
    }
    else {
      if (reduce && active >= 0) shots.value[active]!.style.visibility = activeP > .5 ? 'visible' : 'hidden'
      if (edgeSvg.value && !secretBusy) edgeSvg.value.style.opacity = '0'
    }
    if (!secretBusy) shooting.value = active >= 0

    let top = 0
    reveal.forEach((p, k) => { if (p > .5) top = k })
    current.value = top
  }

  const onScroll = () => { fetchRest(); hideSecret(); if (!ticking) { ticking = true; requestAnimationFrame(paint) } }
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', paint)
  addEventListener('load', paint)
  paint()

  onBeforeUnmount(() => {
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', paint)
    removeEventListener('load', paint)
    removeEventListener('load', onLoad)
    clearTimeout(readyTimer)
    shooting.value = false
    cancelAnimationFrame(secretRaf); clearTimeout(secretTimer)
  })
})
</script>

<template>
  <div class="scene" aria-hidden="true">
    <div v-for="(id, i) in photos" :key="id" ref="shots" class="shot">
      <Foto v-if="i === 0 || ready" :id="id" alt="" :fetchpriority="i === 0 ? 'high' : 'low'" decoding="async" />
    </div>
    <div ref="secretEl" class="shot secret"><Foto v-if="ready" :id="FOTO_SECRETA.id" alt="" fetchpriority="low" decoding="async" /></div>
    <svg ref="edgeSvg" class="iris-edge"><circle ref="edge1" class="e1" /><circle ref="edge2" class="e2" /></svg>
  </div>
  <div class="caption">COOLPIX L810 · DSCN{{ secretOn ? FOTO_SECRETA.id : photos[current] }}</div>
</template>

<style>
.scene { position: fixed; inset: 0; z-index: 0; overflow: hidden; }
.scene .shot { position: absolute; inset: 0; visibility: hidden; }
.scene .shot:first-child { visibility: visible; }
.scene .shot.secret { visibility: hidden; }
.scene .shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
.scene::after { content: ""; position: absolute; inset: 0; background: linear-gradient(transparent 60%, rgba(0,0,0,.18)); pointer-events: none; }
.iris-edge { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0; }
.iris-edge .e1 { fill: none; stroke: rgba(10,12,16,.55); stroke-width: 7; }
.iris-edge .e2 { fill: none; stroke: rgba(255,255,255,.55); stroke-width: 1.2; }
.caption { position: fixed; right: 18px; bottom: 14px; z-index: 1; font-family: "Courier Prime", monospace; font-size: 13px; color: #ffb35c; text-shadow: 0 0 6px rgba(0,0,0,.5); letter-spacing: .04em; }
</style>
