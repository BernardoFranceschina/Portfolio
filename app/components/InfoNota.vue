<script setup lang="ts">
/**
 * Um (i) que abre um bilhete amarelo. `side="right"` abre ao lado (em tela larga; em tela estreita cai
 * para baixo), `side="below"` abre embaixo, alinhado à direita, e `side="below-left"` embaixo, alinhado à esquerda. `arrows` desenha flechinhas vermelhas
 * chamando atenção até a primeira vez que alguém abre.
 */
const props = withDefaults(defineProps<{ title?: string, side?: 'right' | 'below' | 'below-left', arrows?: boolean }>(), {
  title: 'o que é isso?', side: 'below', arrows: false,
})

const id = useId()
const open = ref(false)
const seen = ref(false)
const near = ref(false)
const wrap = ref<HTMLElement>()
watch(open, (v) => { if (v) seen.value = true })

onMounted(() => {
  const close = (e: Event) => {
    if (!open.value) return
    if (e instanceof KeyboardEvent ? e.key === 'Escape' : !wrap.value!.contains(e.target as Node)) open.value = false
  }
  addEventListener('keydown', close)
  addEventListener('pointerdown', close)
  const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { near.value = true; io.disconnect() } }, { rootMargin: '0px 0px -25% 0px' })
  if (props.arrows) io.observe(wrap.value!)
  onBeforeUnmount(() => { io.disconnect(); removeEventListener('keydown', close); removeEventListener('pointerdown', close) })
})
</script>

<template>
  <span ref="wrap" class="info" :class="`info-${side}`">
    <button class="info-i" type="button" :aria-label="title" :aria-expanded="open" :aria-controls="id" @click="open = !open">i</button>

    <!-- flechas: haste curva e a ponta (>) solta, separada da linha -->
    <svg v-if="arrows && !seen" class="info-poke" :class="{ on: near }" viewBox="-100 -100 200 200" aria-hidden="true">
      <g>
        <path d="M53.5 -59.5Q33.6 -47.8 24.1 -26.8M23.8 -17.8L14.1 -15.6L15.2 -25.5" style="--i: 0" />
        <path d="M2.8 -80.0Q9.0 -57.7 1.3 -36.0M6.8 -28.9L0.7 -21.0L-4.8 -29.3" style="--i: 1" />
        <path d="M-49.3 -63.0Q-41.2 -41.4 -22.2 -28.4M-13.4 -26.5L-12.9 -16.5L-22.5 -19.4" style="--i: 2" />
      </g>
    </svg>

    <Transition name="info-pop">
      <aside v-if="open" :id="id" class="info-note" role="note">
        <button class="info-x" type="button" aria-label="fechar" @click="open = false">×</button>
        <span class="info-k hand">{{ title }}</span>
        <slot />
      </aside>
    </Transition>
  </span>
</template>

<style>
.info { position: relative; display: inline-flex; z-index: 6; }
.info-i { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--muted); background: transparent; color: var(--ink); cursor: pointer;
  font: italic 600 14px/1 "Newsreader", serif; text-transform: none; letter-spacing: 0; display: grid; place-items: center; transition: background .15s, color .15s, border-color .15s; }
.info-i:hover, .info-i[aria-expanded="true"] { background: var(--ink); border-color: var(--ink); color: var(--paper); }
.info-i:focus-visible { outline: 2px solid var(--pen); outline-offset: 2px; }

/* bilhete amarelo */
.info-note { position: absolute; z-index: 7; width: min(340px, calc(100vw - 40px)); padding: 18px 22px 16px; text-align: left; text-transform: none; letter-spacing: 0;
  background: var(--noise), linear-gradient(172deg, #fff6b8, #fcea8c); color: #3b3320;
  box-shadow: 0 18px 34px -10px rgba(0,0,0,.45), 0 2px 4px rgba(0,0,0,.12); }
.info-note::after { content: ""; position: absolute; width: 14px; height: 14px; background: #fff6b8; transform: rotate(45deg); }
.info-k { display: block; font-size: 28px; line-height: 1; color: var(--pen); margin-bottom: 8px; padding-right: 20px; }
.info-note p { font-family: "Newsreader", serif; font-size: 16.5px; line-height: 1.5; color: #3b3320; margin: 0; }
.info-note p + p { margin-top: 10px; }
.info-x { position: absolute; right: 8px; top: 6px; width: 28px; height: 28px; border: 0; background: none; font-size: 22px; line-height: 1; color: #8a7a4a; cursor: pointer; }
.info-x:hover { color: #3b3320; }

/* embaixo, alinhado pela direita */
.info-below .info-note, .info-right .info-note { right: -12px; top: calc(100% + 14px); transform: rotate(-1deg); transform-origin: 92% 0; }
.info-below .info-note::after, .info-right .info-note::after { right: 16px; top: -7px; }
/* embaixo, alinhado pela esquerda (para um (i) perto da borda esquerda da tela) */
.info-below-left .info-note { left: -12px; top: calc(100% + 14px); transform: rotate(1deg); transform-origin: 8% 0; }
.info-below-left .info-note::after { left: 16px; top: -7px; }
/* ao lado, à direita (só quando cabe) */
@media (min-width: 1200px) {
  .info-right .info-note { right: auto; left: calc(100% + 18px); top: -18px; transform: rotate(1deg); transform-origin: 0 10%; }
  .info-right .info-note::after { right: auto; left: -7px; top: 22px; }
}

.info-pop-enter-active, .info-pop-leave-active { transition: opacity .22s ease, transform .28s cubic-bezier(.3,1.4,.5,1); }
.info-pop-enter-from, .info-pop-leave-to { opacity: 0; transform: rotate(-3deg) translateY(-8px) scale(.96); }
@media (min-width: 1200px) {
  .info-right .info-pop-enter-from, .info-right .info-pop-leave-to { transform: rotate(3deg) translateX(-10px) scale(.96); }
}

/* flechinhas vermelhas */
.info-poke { position: absolute; left: 50%; top: 50%; width: 200px; height: 200px; margin: -100px 0 0 -100px; overflow: visible; pointer-events: none; }
.info-poke.on g { animation: info-poke 1.8s 1.8s ease-in-out infinite; }
.info-poke path { fill: none; stroke: #e2462c; stroke-width: 2.8; stroke-linecap: round; stroke-linejoin: round;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,.35));
  stroke-dasharray: 120; stroke-dashoffset: 120; }
.info-poke.on path { animation: info-draw .5s calc(.4s + var(--i) * .2s) ease-out forwards; }
@keyframes info-draw { to { stroke-dashoffset: 0; } }
@keyframes info-poke { 0%, 60%, 100% { transform: scale(1); } 75% { transform: scale(.86); } }
/* celular: os (i) ficam colados na borda direita e a flecha da direita sairia da tela */
@media (max-width: 700px) {
  .info-poke:not(.cam-poke) path:first-child { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .info-poke g, .info-poke path { animation: none !important; stroke-dashoffset: 0; }
  .info-pop-enter-active, .info-pop-leave-active { transition: opacity .15s; }
}
</style>
