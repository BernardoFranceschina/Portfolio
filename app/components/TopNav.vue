<script setup lang="ts">
/**
 * Etiquetas no topo. Com `sections`, no canto fica só uma etiqueta minúscula dizendo em que seção a
 * pessoa está; um clique leva para a próxima (na última, de volta ao começo).
 */
type Item = { to: string, label: string }
const props = withDefaults(defineProps<{
  home: Item
  links?: Item[]
  sections?: Item[]
}>(), { links: () => [] })

const here = ref(-1) // seção na tela agora (-1: ainda no começo, antes da primeira)
const list = computed(() => props.sections ?? [])
const name = computed(() => list.value[here.value]?.label ?? 'começo')
const last = computed(() => here.value === list.value.length - 1)
const next = computed(() => last.value ? { to: '/', label: 'começo' } : list.value[here.value + 1]!)

// rola direto até o bloco, sem passar pelo roteador: trocar o # da URL contaria como visita nova no
// Analytics e, se o # já fosse o mesmo (a pessoa rolou de volta), o roteador não rolaria nada
function go() {
  if (last.value) return scrollTo({ top: 0, behavior: 'smooth' })
  const el = document.querySelector<HTMLElement>(next.value.to)
  if (!el) return
  const extra = parseFloat(getComputedStyle(el).scrollMarginTop) || 0 // igual ao router.options.ts
  scrollTo({ top: el.getBoundingClientRect().top + scrollY - 40 - extra, behavior: 'smooth' })
}

onMounted(() => {
  if (!list.value.length) return
  const els = list.value.map(i => document.querySelector<HTMLElement>(i.to))
  // a seção atual é a última cujo topo já passou de 45% da tela
  let ticking = false
  const where = () => {
    ticking = false
    let k = -1
    els.forEach((el, i) => { if (el && el.getBoundingClientRect().top < innerHeight * .45) k = i })
    here.value = k
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(where) } }
  addEventListener('scroll', onScroll, { passive: true })
  where()
  onBeforeUnmount(() => removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header class="top">
    <NuxtLink class="label" :to="home.to">{{ home.label }}</NuxtLink>

    <button
      v-if="list.length" type="button" class="here" :aria-label="`você está em: ${name}. ir para: ${next.label}`" @click="go"
    >
      <Transition name="here-swap" mode="out-in">
        <span :key="name" class="here-name">{{ name }}</span>
      </Transition>
      <span class="here-go" aria-hidden="true">{{ last ? '↑' : '↓' }}</span>
    </button>

    <nav v-else-if="links.length" aria-label="principal">
      <NuxtLink v-for="l in links" :key="l.to" class="label" :to="l.to">{{ l.label }}</NuxtLink>
    </nav>
  </header>
</template>

<style>
.top { position: fixed; top: 0; left: 0; right: 0; z-index: 10; display: flex; justify-content: space-between; align-items: flex-start; padding: 18px 20px; pointer-events: none; }
.top > * { pointer-events: auto; }
.top > nav { display: flex; gap: 10px; }
.top > nav .label:nth-child(3n+1) { transform: rotate(-1.5deg); }
.top > nav .label:nth-child(3n+2) { transform: rotate(1deg); }
.top > nav .label:nth-child(3n) { transform: rotate(-.5deg); }

/* onde estou: tirinha de papel minúscula; o nome troca deslizando quando a seção muda */
.here { display: inline-flex; align-items: center; gap: 7px; margin-top: 6px; padding: 3px 9px 3px 10px; border: 0; cursor: pointer;
  font: 12.5px/1.3 "Courier Prime", monospace; letter-spacing: .03em; color: var(--muted); background: var(--paper);
  box-shadow: 0 2px 6px rgba(0,0,0,.18); transform: rotate(-1deg); }
.here:hover { background: #fff0a8; color: var(--ink); }
.here:focus-visible { outline: 2px solid var(--pen); outline-offset: 2px; }
.here-name { display: inline-block; }
.here-go { color: var(--red); font-weight: 700; transition: transform .2s; }
.here:hover .here-go { transform: translateY(2px); }
.here-swap-enter-active, .here-swap-leave-active { transition: opacity .16s ease, transform .16s ease; }
.here-swap-enter-from { opacity: 0; transform: translateY(5px); }
.here-swap-leave-to { opacity: 0; transform: translateY(-5px); }

@media (max-width: 480px) {
  .top { padding: 12px; }
  .top .label { font-size: 16px; padding: 5px 10px; }
  .top > nav { gap: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  .here-swap-enter-active, .here-swap-leave-active { transition: none; }
}
</style>
