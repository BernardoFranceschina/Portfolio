<script setup lang="ts">
/** Adesivinho de gibi antigo ("POW!") escrito "vibe-coded!!!", na linha do texto. Estoura quando aparece na tela. */
const el = ref<HTMLElement>()
const hit = ref(false)

// explosão em volta de uma elipse: pontas de tamanhos diferentes, sempre iguais (sem aleatório)
const JIT = [1, .93, .98, .9, 1, .94, .97, .91, 1, .92, .99, .9, 1, .95, .96, .92, 1, .93]
const n = JIT.length
const burst = `polygon(${JIT.flatMap((j, i) => {
  const a = (i / n) * Math.PI * 2, b = a + Math.PI / n
  return [[Math.cos(a) * 50 * j, Math.sin(a) * 50 * j], [Math.cos(b) * 41, Math.sin(b) * 41]]
}).map(([x, y]) => `${(50 + x!).toFixed(1)}% ${(50 + y!).toFixed(1)}%`).join(', ')})`

onMounted(() => {
  const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { hit.value = true; io.disconnect() } }, { rootMargin: '0px 0px -20% 0px' })
  io.observe(el.value!)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <span ref="el" class="pow" :class="{ hit }">
    <span class="pow-o" :style="{ clipPath: burst }"><span class="pow-i" :style="{ clipPath: burst }">vibe-coded!!!</span></span>
  </span>
</template>

<style>
/* inline: margem negativa para não engrossar a linha nem empurrar o texto */
.pow { display: inline-block; vertical-align: middle; margin: -4px 0 -14px 6px; transform: rotate(-6deg); opacity: 0;
  filter: drop-shadow(2px 2px 0 rgba(35,32,27,.3)); }
.pow-o { display: block; padding: 2px; background: #23201b; }
.pow-i { display: block; padding: 14px 27px 13px; background: #ffd93b; color: #23201b; white-space: nowrap;
  font: 17px/1 "Bangers", "Impact", sans-serif; letter-spacing: .06em; text-transform: uppercase; }
.pow.hit { animation: pow-estoura .5s .45s cubic-bezier(.2,1.6,.4,1) forwards; }
@keyframes pow-estoura {
  0% { opacity: 0; transform: rotate(-20deg) scale(.3); }
  60% { opacity: 1; transform: rotate(-3deg) scale(1.12); }
  100% { opacity: 1; transform: rotate(-6deg) scale(1); }
}
@media (prefers-reduced-motion: reduce) { .pow.hit { animation: none; opacity: 1; } }
</style>
