<script setup lang="ts">
/** Varal de fotos: arrasta, as fotos balançam, o bonequinho comenta e um clique amplia. Fotos, ordem e falas: app/data/varal.ts */
import { FOTOS, DICAS, FALAS, type FotoVaral } from '~/data/varal'

const GAP = 250, START = 90
const width = START * 2 + (FOTOS.length - 1) * GAP + 210
// o varal cede entre os "postes"
const ropeY = (x: number) => 46 + Math.sin(Math.PI * ((x % (GAP * 3)) / (GAP * 3))) * 34
let path = `M0 ${ropeY(0)}`
for (let x = 10; x <= width; x += 10) path += ` L${x} ${ropeY(x).toFixed(1)}`

// inclinação de repouso fixa (determinística, para não divergir entre servidor e cliente)
const hangs = FOTOS.map((f, i) => ({
  ...f,
  x: START + i * GAP,
  y: ropeY(START + i * GAP + 105) - 4,
  rest: (((i * 37) % 7) - 3) * .9,
  kick: i % 2 ? 9 : -9,
}))

const { say, secret } = useWalker()
const track = ref<HTMLElement>()
// por índice (um ref dentro de v-for não garante a ordem da lista)
const hangEls: HTMLElement[] = []
const varal = ref<HTMLElement>()
const open = ref<FotoVaral | null>(null)

let hint = 0
function swing(i: number) {
  const el = hangEls[i]
  if (!el) return
  el.classList.remove('swing'); void el.offsetWidth; el.classList.add('swing')
  say(hangs[i]!.fala || DICAS[hint++ % DICAS.length]!, 1600)
}

/* arrastar; o tranco faz as fotos balançarem */
let down: { x: number, s: number } | null = null
let moved = false, lastX = 0
let settle: ReturnType<typeof setTimeout> | undefined
// no toque o próprio navegador rola o varal (com inércia); o arrasto daqui é só para o mouse
function onDown(e: PointerEvent) {
  if (e.button !== 0 || e.pointerType !== 'mouse') return
  e.preventDefault()
  down = { x: e.clientX, s: track.value!.scrollLeft }
  moved = false
}
function onMove(e: PointerEvent) {
  if (!down || !track.value) return
  const dx = e.clientX - down.x
  if (Math.abs(dx) > 5) { moved = true; track.value.classList.add('dragging') }
  track.value.scrollLeft = down.s - dx
}
function onUp() {
  down = null
  track.value?.classList.remove('dragging')
}
function onTrackScroll() {
  const t = track.value!
  const v = Math.max(-14, Math.min(14, (t.scrollLeft - lastX) * .6))
  lastX = t.scrollLeft
  hangEls.forEach((h, i) => { h.classList.remove('swing'); h.style.transform = `rotate(${hangs[i]!.rest + v}deg)` })
  clearTimeout(settle)
  settle = setTimeout(() => hangEls.forEach((h, i) => { h.style.transform = `rotate(${hangs[i]!.rest}deg)` }), 90)
}

let opened = 0
const box = ref<HTMLElement>()
const closeBtn = ref<HTMLButtonElement>()
// aberta, a página por trás não rola (e o fundo não troca de foto por baixo)
watch(open, (v) => { document.documentElement.style.overflow = v ? 'hidden' : '' })
let back: HTMLElement | null = null // quem abriu: o foco volta para ele ao fechar
// pelo teclado não tem arrasto: `moved` pode ter sobrado do último arrasto com o mouse
function enlarge(f: FotoVaral, key = false) {
  if (moved && !key) return
  back = document.activeElement as HTMLElement | null
  open.value = f
  nextTick(() => box.value?.focus())
  if (!opened++) setTimeout(() => say(FALAS.ampliou, 1600), 300)
}
function close() {
  if (!open.value) return
  open.value = null
  back?.focus({ preventScroll: true })
}
const onKey = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'Tab') { e.preventDefault(); closeBtn.value?.focus() } // aberta, o foco fica nela
}

onMounted(() => {
  addEventListener('pointermove', onMove)
  addEventListener('pointerup', onUp)
  addEventListener('pointercancel', onUp) // no toque, quando o navegador assume a rolagem
  addEventListener('keydown', onKey)
  // na primeira vez que o varal aparece, ele avisa
  const io = new IntersectionObserver(([e]) => {
    if (e?.isIntersecting) { say(FALAS.chegou, 2400); io.disconnect() }
  }, { threshold: .6 })
  if (varal.value) io.observe(varal.value)
  onBeforeUnmount(() => {
    removeEventListener('pointermove', onMove)
    removeEventListener('pointerup', onUp)
    removeEventListener('pointercancel', onUp)
    removeEventListener('keydown', onKey)
    document.documentElement.style.overflow = ''
    io.disconnect()
    clearTimeout(settle)
  })
})
</script>

<template>
  <section id="varal" ref="varal" class="varal" data-shot="2" aria-label="varal de fotos">
    <div ref="track" class="track" @pointerdown="onDown" @scroll.passive="onTrackScroll" @dragstart.prevent>
      <div class="line" :style="{ width: `${width}px` }">
        <svg class="rope" :width="width" :viewBox="`0 0 ${width} 120`" aria-hidden="true">
          <path :d="path" fill="none" stroke="#efe6d2" stroke-width="2.2" />
          <path :d="path" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1" transform="translate(0 2)" />
        </svg>
        <div
          v-for="(h, i) in hangs" :key="h.id" :ref="el => { if (el) hangEls[i] = el as HTMLElement }" class="hang"
          :style="{ left: `${h.x}px`, top: `${h.y}px`, transform: `rotate(${h.rest}deg)`, '--r1': `${h.kick}deg` }"
          @mouseenter="swing(i)"
        >
          <span class="pin" />
          <figure role="button" tabindex="0" :aria-label="`ampliar foto: ${h.legenda}`" @click="enlarge(h)" @keydown.enter.prevent="enlarge(h, true)" @keydown.space.prevent="enlarge(h, true)">
            <Foto :id="h.id" mini :alt="h.legenda" loading="lazy" draggable="false" />
            <figcaption>{{ h.legenda }}</figcaption>
          </figure>
        </div>
      </div>
    </div>
    <span class="tip">← arrasta o varal - <span class="tip-mouse">clica</span><span class="tip-touch">toca</span> em uma foto</span>

    <!-- etiqueta: de quem são as fotos, e a câmera no (i) -->
    <div class="varal-tag">
      <span class="hand">um pouco de um hobby meu</span>
      <InfoNota title="a câmera" side="below-left">
        <!-- easter egg: clicar na câmera faz o bonequinho tirar a foto secreta (FOTO_SECRETA em app/data/varal.ts) -->
        <button type="button" class="cam" aria-label="câmera Nikon Coolpix L810, vermelha (clica nela)" @click="secret()">
          <Foto id="camera" sizes="190px" alt="" width="225" height="225" />
          <!-- as mesmas flechinhas do (i), apontando para a câmera -->
          <svg class="info-poke on cam-poke" viewBox="-150 -110 300 220" aria-hidden="true">
            <g>
              <path d="M-140 -60Q-128 -30 -108 -18M-101.5 -21L-96 -10.8L-107.7 -11" style="--i: 0" />
              <path d="M140 -60Q128 -30 108 -18M101.5 -21L96 -10.8L107.7 -11" style="--i: 1" />
              <path d="M138 50Q126 30 106 26M103.3 19.3L92.3 23.3L100.9 31.1" style="--i: 2" />
            </g>
          </svg>
        </button>
        <p><b>Nikon Coolpix L810</b>. <br>Todas as fotos deste varal saíram dela.</p>
      </InfoNota>
    </div>
  </section>

  <Teleport to="body">
    <div
      ref="box" class="lightbox" :class="{ on: open }" role="dialog" aria-modal="true" tabindex="-1"
      :aria-label="open ? `foto: ${open.legenda} (Esc fecha)` : undefined" :inert="!open" @click="close"
    >
      <button ref="closeBtn" type="button" class="label lb-x">fechar ×</button>
      <figure v-if="open">
        <Foto :id="open.id" sizes="min(1000px, 92vw)" :alt="open.legenda" />
        <figcaption><span>{{ open.legenda }}</span><span>COOLPIX L810 · DSCN{{ open.id }}</span></figcaption>
      </figure>
    </div>
  </Teleport>
</template>

<style>
.varal { position: relative; height: 350px; margin: 34vh 0 30vh; transform: rotate(-2.2deg); scroll-margin-top: 120px; }
.varal .track { position: absolute; inset: 0 -40px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; cursor: grab; user-select: none; -webkit-user-select: none; touch-action: pan-x pan-y; }
.varal .track::-webkit-scrollbar { display: none; }
.varal .track.dragging { cursor: grabbing; }
.varal .line { position: relative; height: 100%; }
.varal svg.rope { position: absolute; left: 0; top: 0; height: 120px; pointer-events: none; }
.hang { position: absolute; width: 210px; transform-origin: 50% 0; transition: transform .6s cubic-bezier(.3,1.8,.5,1); }
.hang .pin { position: absolute; left: 50%; top: -14px; width: 12px; height: 34px; margin-left: -6px; background: linear-gradient(90deg, #c49a6c, #e3c095 50%, #b98d5f); border-radius: 2px; z-index: 3; box-shadow: 0 2px 3px rgba(0,0,0,.3); }
.hang .pin::after { content: ""; position: absolute; left: 1px; right: 1px; top: 14px; height: 3px; background: #8a8f96; }
.hang figure { background: #fff; padding: 9px 9px 34px; box-shadow: 0 12px 22px -10px rgba(0,0,0,.5); cursor: zoom-in; position: relative; }
.hang img { display: block; width: 100%; aspect-ratio: 4/3; object-fit: cover; pointer-events: none; }
.hang figcaption { position: absolute; left: 11px; bottom: 6px; font-family: "Caveat", cursive; font-size: 21px; color: var(--pencil); }
.hang.swing { animation: varal-swing 1.4s cubic-bezier(.3,.1,.3,1); }
@keyframes varal-swing { 15% { transform: rotate(var(--r1, 9deg)); } 40% { transform: rotate(-6deg); } 65% { transform: rotate(3deg); } 85% { transform: rotate(-1deg); } }
/* etiqueta acima do varal, à esquerda (o bilhete do (i) abre para baixo e para a direita) */
.varal-tag { position: absolute; left: 7vw; top: -96px; z-index: 5; display: flex; align-items: center; gap: 12px; padding: 8px 14px 8px 18px;
  background: var(--noise), var(--paper); box-shadow: 0 6px 14px -6px rgba(0,0,0,.45); transform: rotate(-2deg); }
.varal-tag .hand { font-size: 27px; line-height: 1; color: var(--pen); white-space: nowrap; }
.varal-tag .cam { position: relative; display: block; width: 190px; margin: 0 auto 6px; padding: 0; border: 0; background: none; cursor: pointer; }
.varal-tag .cam img { display: block; width: 100%; height: auto; mix-blend-mode: multiply; }
.varal-tag .cam-poke { width: 300px; height: 220px; margin: -110px 0 0 -150px; }
.varal-tag .cam:focus-visible { outline: 2px dashed var(--pen); outline-offset: 2px; }
.varal .tip { position: absolute; left: 6vw; top: 300px; font-family: "Caveat", cursive; font-size: 26px; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.6); transform: rotate(2.2deg); pointer-events: none; }

.lightbox { position: fixed; inset: 0; z-index: 30; background: rgba(15,20,28,.82); display: grid; place-items: center; opacity: 0; pointer-events: none; transition: opacity .3s; cursor: zoom-out; padding: 24px; }
.lightbox.on { opacity: 1; pointer-events: auto; }
.lightbox:focus { outline: none; }
/* o clique em qualquer lugar já fecha; o botão é para quem procura um */
.lightbox .lb-x { position: absolute; top: 18px; right: 20px; border: 0; cursor: pointer; transform: rotate(1deg); }
.lightbox .lb-x:focus-visible { outline: 2px solid var(--pen); outline-offset: 2px; }
.lightbox figure { background: #fff; padding: 14px 14px 52px; max-width: min(1000px, 92vw); transform: rotate(-1deg); position: relative; animation: lightbox-in .4s cubic-bezier(.3,1.6,.5,1); }
@keyframes lightbox-in { from { transform: rotate(-1deg) scale(.94); } }
.lightbox img { display: block; width: 100%; max-height: 74vh; object-fit: contain; }
.lightbox figcaption { position: absolute; left: 16px; right: 16px; bottom: 12px; display: flex; justify-content: space-between; font-family: "Caveat", cursive; font-size: 26px; color: var(--pencil); }
.lightbox figcaption span:last-child { font-family: "Courier Prime", monospace; font-size: 13px; color: #d98a3a; align-self: center; }

@media (max-width: 700px) {
  .varal { height: 290px; }
  .hang { width: 160px; }
  .varal .tip { top: 250px; right: 16px; font-size: 23px; text-wrap: balance; }
  .varal-tag { left: 16px; top: -80px; }
  /* o bilhete da câmera abre a partir da etiqueta (do (i), no fim dela, sairia da tela) */
  .varal-tag .info { position: static; }
  .varal-tag .info-below-left .info-note { left: 0; }
  .varal-tag .info-below-left .info-note::after { left: auto; right: 26px; }
}
.varal .tip-touch { display: none; }
@media (hover: none) {
  .varal .tip-mouse { display: none; }
  .varal .tip-touch { display: inline; }
}
</style>
