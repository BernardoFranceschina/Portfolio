<script setup lang="ts">
/** Imagem de compartilhamento: uma foto minha de fundo com um bilhete de papel por cima. */
const { photo = '0716', title = 'oi, eu sou o Bernardo.' } = defineProps<{
  photo?: string
  title?: string
}>()
</script>

<template>
  <div style="display: flex; width: 1200px; height: 630px; position: relative; background-color: #2b3f57;">
    <img :src="`/fotos/${photo}.jpg`" width="1200" height="630" style="position: absolute; top: 0; left: 0; width: 1200px; height: 630px; object-fit: cover;">
    <div
      style="position: absolute; right: 90px; bottom: 90px; width: 560px; display: flex; flex-direction: column;
             padding: 40px 44px 44px; background-color: #fbf7ee; transform: rotate(1.5deg);
             box-shadow: 0 20px 40px rgba(0,0,0,.35);"
    >
      <div style="font-family: 'Caveat'; font-weight: 600; font-size: 64px; line-height: 1; color: #23408e;">{{ title }}</div>
      <div style="margin-top: 22px; font-family: 'Newsreader'; font-size: 24px; color: #776f62;">Bernardo Franceschina · franceschina.dev</div>
    </div>
    <div style="position: absolute; right: 24px; bottom: 18px; font-family: 'Courier Prime'; font-size: 17px; letter-spacing: .04em; color: #ffb35c;">COOLPIX L810 · DSCN{{ photo }}</div>
  </div>
</template>
