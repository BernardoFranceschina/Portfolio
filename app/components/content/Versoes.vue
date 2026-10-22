<!-- lista escrita à mão, com as versões descartadas riscadas -->
<template>
  <div class="versions"><slot /></div>
</template>

<style>
.versions ul { list-style: none; margin: 8px 0 30px; padding: 0; font-family: "Caveat", cursive; font-size: 27px; line-height: 1.35; }
.versions li { margin: 0; }
.versions li del { text-decoration-color: var(--red); text-decoration-thickness: 2px; color: var(--muted); }
.versions li:last-child { color: var(--pen); }
</style>
