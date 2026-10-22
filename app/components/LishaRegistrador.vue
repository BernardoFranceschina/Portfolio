<script setup lang="ts">
/**
 * Registrador de telemetria do próprio leitor. O papel avança com a distância rolada (não com o tempo)
 * e a pena marca a velocidade em volta de uma linha central (descendo a página o traço sobe, subindo
 * ele desce): é o desenho de como a pessoa leu até aqui. Grava desde que a página abre, marca onde
 * cada seção passou, e as pausas trazem a pena de volta ao centro.
 */
const SECTIONS: [string, string][] = [['#sobre', 'sobre'], ['#trabalho', 'trabalho'], ['#varal', 'varal'], ['#caderno', 'caderno'], ['#oi', 'oi']]
const H = 170, MID = 92, AMP = 62, K = .18 // K: px de papel por px rolado
const PX_M = .0254 / 96 // 1px de tela em metros
const CH = 7.2 // largura de um caractere do rótulo (Courier Prime 12px)

const box = ref<HTMLElement>()
const W = ref(640)
const pen = computed(() => W.value - 64)
const trace = ref('')
const penY = ref(MID)
const feed = ref(0)
const marks = ref<{ x: number, label: string, show: boolean, end: boolean }[]>([])
const clock = ref('00:00:00')
const dist = ref('0,0')
const peak = ref('0,0')

type S = { d: number, v: number, n: number } // n: tremor gravado junto, para o traço não mudar a cada quadro
const samples: S[] = [{ d: 0, v: 0, n: 0 }]
const markAt: { d: number, label: string }[] = [{ d: 0, label: 'início' }]
let total = 0, top = 0

const yOf = (v: number, n = 0) => MID - AMP * Math.max(-1, Math.min(1, v / 4.5)) + n
const fmt = (n: number) => n.toFixed(1).replace('.', ',')

function render() {
  const p = pen.value
  let d = ''
  for (let i = samples.length - 1; i >= 0; i--) {
    const s = samples[i]!, x = p - (total - s.d) * K
    d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${yOf(s.v, s.n).toFixed(1)}`
    if (x < -2) break
  }
  trace.value = d
  feed.value = (total * K) % 50
  // rótulo que bateria no trilho da pena vai para o lado esquerdo da linha
  const ms = markAt.map((m) => {
    const x = p - (total - m.d) * K
    return { x, label: m.label, show: true, end: x + 4 + m.label.length * CH > p - 6 }
  })
  // rótulos que se encostariam: fica o mais novo
  const span = (m: typeof ms[number]) => { const w = m.label.length * CH; return m.end ? [m.x - 4 - w, m.x - 4] : [m.x + 4, m.x + 4 + w] }
  ms.forEach((m, i) => { const n = ms[i + 1]; if (n && span(m)[1]! + 8 > span(n)[0]!) m.show = false })
  marks.value = ms.filter(m => m.x > 2)
  dist.value = fmt(total * PX_M)
  peak.value = fmt(top * 1000 * PX_M)
}

onMounted(() => {
  const el = box.value!
  const measure = () => { W.value = Math.max(300, Math.round(el.clientWidth)); render() }
  const ro = new ResizeObserver(measure)
  ro.observe(el)

  const t0 = Date.now()
  const timer = setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000)
    clock.value = [s / 3600, (s / 60) % 60, s % 60].map(n => String(Math.floor(n)).padStart(2, '0')).join(':')
  }, 1000)

  let lastY = scrollY, lastT = performance.now(), v = 0, acc = 0, idle = 0, queued = false
  const frame = () => { queued = false; render() }
  const onScroll = () => {
    const now = performance.now(), dt = now - lastT
    const sy = scrollY - lastY, dy = Math.abs(sy)
    lastY = scrollY; lastT = now
    if (!dy) return
    const raw = Math.max(-12, Math.min(12, sy / Math.max(8, dt)))
    v = dt > 250 ? raw * .6 : v + (raw - v) * .6 // pouca suavização: sinal com textura, não arco
    top = Math.max(top, Math.abs(v))
    total += dy; acc += dy
    if (acc >= 3) {
      acc = 0
      const n = (Math.random() - .5) * Math.min(9, 2 + Math.abs(v) * 5)
      samples.push({ d: total, v, n }); penY.value = yOf(v, n)
    }
    if (samples.length > 4000) samples.splice(0, 1000)
    clearTimeout(idle)
    // parou de rolar: a pena volta à base no mesmo ponto do papel (a pausa fica desenhada)
    idle = window.setTimeout(() => { v = 0; samples.push({ d: total, v: 0, n: 0 }); penY.value = MID; render() }, 160)
    if (!queued) { queued = true; requestAnimationFrame(frame) }
  }
  addEventListener('scroll', onScroll, { passive: true })

  // marca a distância em que cada seção chegou ao meio da tela, uma vez só
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const label = SECTIONS.find(([sel]) => e.target.matches(sel))?.[1]
      if (label) markAt.push({ d: total, label })
      io.unobserve(e.target)
    }
    render()
  }, { rootMargin: '-50% 0px -50% 0px' })
  SECTIONS.forEach(([sel]) => { const t = document.querySelector(sel); if (t) io.observe(t) })

  measure()
  onBeforeUnmount(() => { ro.disconnect(); io.disconnect(); clearInterval(timer); clearTimeout(idle); removeEventListener('scroll', onScroll) })
})
</script>

<template>
  <div class="rec-root">
  <figure ref="box" class="recorder">
    <span class="rec-paper" aria-hidden="true" />
    <figcaption class="rec-top mono">
      <span>telemetria - <b>LISHA/UFSC</b></span>
      <InfoNota side="right" arrows>
        <p>No <b>LISHA</b>, laboratório da UFSC onde faço meu TCC, ajudo a construir a telemetria de carros da <b>Renault/Horse</b>: os dados saem do carro em movimento e chegam instantaneamente ao engenheiro.</p>
        <p>Este papel faz o mesmo com você. Desde que a página abriu, é registrado a velocidade com que você rola a página: cada morro é um trecho que você passou rápido, e a linha reta no meio são as pausas para ler.</p>
      </InfoNota>
    </figcaption>

    <svg :viewBox="`0 0 ${W} ${H}`" :height="H" aria-hidden="true">
      <defs>
        <pattern id="rec-grid" width="50" height="50" patternUnits="userSpaceOnUse" :patternTransform="`translate(${-feed} 2)`">
          <path d="M10 0V50M20 0V50M30 0V50M40 0V50M0 10H50M0 20H50M0 30H50M0 40H50" class="g-min" />
          <path d="M0 0V50M0 0H50" class="g-maj" />
        </pattern>
      </defs>
      <rect :width="W" :height="H" fill="url(#rec-grid)" />
      <line x1="0" :x2="W" :y1="MID" :y2="MID" class="rec-base" />

      <g v-for="m in marks" :key="m.label" class="rec-mark">
        <line :x1="m.x" :x2="m.x" y1="18" :y2="H - 6" />
        <text v-if="m.show" :x="m.end ? m.x - 4 : m.x + 4" y="14" :text-anchor="m.end ? 'end' : 'start'">{{ m.label }}</text>
      </g>

      <path :d="trace" class="rec-trace" />

      <!-- trilho, carro e braço da pena -->
      <line :x1="W - 22" :x2="W - 22" y1="8" :y2="H - 8" class="rec-rail" />
      <line :x1="pen" :x2="W - 22" :y1="penY" :y2="penY" class="rec-arm" />
      <rect :x="W - 29" :y="penY - 6" width="14" height="12" rx="2" class="rec-car" />
      <circle :cx="pen" :cy="penY" r="3.2" class="rec-tip" />
    </svg>

    <div class="rec-foot">
      <span class="mono">veículo <b>você</b></span>
      <span class="mono">sessão <b>{{ clock }}</b></span>
      <span class="mono">percorrido <b>{{ dist }} m</b></span>
      <span class="mono">pico <b>{{ peak }} m/s</b></span>
      <span class="rec-stack hand">Python · Django · MQTT · Celery</span>
    </div>
    <p class="sr-only">Um registrador de telemetria desenha a velocidade com que você rolou a página até aqui, como a telemetria de um carro de teste.</p>
  </figure>
  <!-- fora do papel (a máscara dos furos cortaria) -->
  <span class="rec-you hand" aria-hidden="true">↑ isso é você, chegando até aqui</span>
  </div>
</template>

<style>
.recorder { position: relative; margin: 0; padding: 22px 0 16px; }
/* papel contínuo com furos de tração: a máscara fica só no fundo, para o bilhete do (i) poder sair do papel */
.rec-paper { position: absolute; inset: 0; background: var(--noise), #fdfcf8;
  -webkit-mask: radial-gradient(circle 3.5px at 10px 10px, transparent 3px, #000 3.8px) 0 0 / 20px 100% repeat-x,
                radial-gradient(circle 3.5px at 10px calc(100% - 10px), transparent 3px, #000 3.8px) 0 0 / 20px 100% repeat-x;
  -webkit-mask-composite: source-in;
          mask: radial-gradient(circle 3.5px at 10px 10px, transparent 3px, #000 3.8px) 0 0 / 20px 100% repeat-x,
                radial-gradient(circle 3.5px at 10px calc(100% - 10px), transparent 3px, #000 3.8px) 0 0 / 20px 100% repeat-x;
          mask-composite: intersect; }
.recorder > :not(.rec-paper):not(.sr-only) { position: relative; }
/* picote separando a margem dos furos */
.recorder::before, .recorder::after { content: ""; position: absolute; z-index: 1; left: 0; right: 0; border-top: 1px dashed #d9d4c8; }
.recorder::before { top: 20px; }
.recorder::after { bottom: 20px; }
.rec-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 4px 14px 6px 18px; font-size: 12px; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); }
.rec-top b { color: var(--ink); }
.recorder > svg { display: block; width: 100%; }
.g-min { stroke: #e9e6de; stroke-width: 1; fill: none; }
.g-maj { stroke: #dad5ca; stroke-width: 1; fill: none; }
.rec-base { stroke: #cfc8b9; stroke-width: 1; }
.rec-mark line { stroke: var(--muted); stroke-width: 1; stroke-dasharray: 2 4; opacity: .55; }
.rec-mark text { font-family: "Courier Prime", monospace; font-size: 12px; fill: var(--muted); }
.rec-trace { fill: none; stroke: #2a2722; stroke-width: 1.6; stroke-linejoin: round; stroke-linecap: round; }
.rec-rail { stroke: #cfc8b9; stroke-width: 2; }
.rec-arm { stroke: #4a463f; stroke-width: 1.6; }
.rec-car { fill: #4a463f; }
.rec-tip { fill: var(--red); }
.rec-foot { display: flex; flex-wrap: wrap; gap: 6px 22px; padding: 10px 18px 10px; font-size: 13px; color: var(--muted); }
.rec-foot b { color: var(--ink); font-weight: 700; }
.rec-root { position: relative; }
.rec-you { position: absolute; left: 18px; top: calc(100% + 12px); width: max-content; font-size: 25px; line-height: 1.05; color: #fff; transform: rotate(-2deg);
  text-shadow: 0 1px 2px rgba(0,0,0,.55), 0 0 12px rgba(0,0,0,.35); pointer-events: none; }
.rec-foot { align-items: baseline; }
.rec-stack { margin-left: auto; font-size: 23px; line-height: 1; color: var(--pen); transform: rotate(-2deg); }
@media (max-width: 700px) {
  .rec-stack { margin-left: 0; }
  .rec-you { display: none; }
}

</style>
