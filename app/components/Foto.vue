<script setup lang="ts">
/**
 * Uma foto minha: AVIF quando o navegador aceita (quase todos), o JPG original como reserva.
 * As versões são geradas por `npm run fotos` (scripts/fotos.mjs).
 * - padrão: escolhe entre <id>-1280.avif e <id>.avif pela largura em que a foto aparece (`sizes`) e pela
 *   largura real da original (app/data/fotos.json, gerado junto)
 * - `mini`: a miniatura do varal (fotos/varal/<id>)
 * Atributos como alt, loading e fetchpriority vão para o <img>.
 */
import LARGURAS from '~/data/fotos.json'

defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ id: string, mini?: boolean, sizes?: string }>(), { mini: false, sizes: '100vw' })

const base = computed(() => props.mini ? `/fotos/varal/${props.id}` : `/fotos/${props.id}`)
// larguras reais (app/data/fotos.json): uma original com até 1280px só tem uma versão de verdade
const srcset = computed(() => {
  if (props.mini) return `${base.value}.avif`
  const w = (LARGURAS as Record<string, number>)[props.id] ?? 2000
  return w > 1280 ? `${base.value}-1280.avif 1280w, ${base.value}.avif ${w}w` : `${base.value}.avif ${w}w`
})
</script>

<template>
  <picture class="foto">
    <source type="image/avif" :srcset="srcset" :sizes="mini ? undefined : sizes">
    <img :src="`${base}.jpg`" v-bind="$attrs">
  </picture>
</template>

<style>
/* o <picture> não ocupa caixa: os estilos de sempre (".shot img", ".hang img"...) continuam valendo */
.foto { display: contents; }
</style>
