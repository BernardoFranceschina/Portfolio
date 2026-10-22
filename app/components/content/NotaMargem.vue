<!-- anotação à mão na margem, escrita direto na foto ao lado da coluna -->
<template>
  <span class="nota-anchor" aria-hidden="true">
    <span class="note-m nota"><slot mdc-unwrap="p" /></span>
  </span>
</template>

<style>
.nota-anchor { position: relative; display: block; height: 0; }
.nota-anchor .nota { left: calc(100% + 90px); top: -60px; width: 210px; transform: rotate(-4deg); }
.nota-anchor:nth-of-type(even) .nota { transform: rotate(3deg); }
@media (max-width: 1100px) {
  .nota-anchor { height: auto; }
  .nota-anchor .nota { position: static; display: block; margin: 0 0 20px; width: auto; color: var(--pencil); text-shadow: none; transform: none; }
}
</style>
