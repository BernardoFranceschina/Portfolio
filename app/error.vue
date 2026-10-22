<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const lost = computed(() => props.error.statusCode === 404)

// o "· Bernardo Franceschina" vem do separator do site (nuxt.config.ts)
useSeoMeta({ title: () => lost.value ? 'Não saiu na foto' : 'A câmera travou', robots: 'noindex' })

// volta limpando o erro (um NuxtLink comum deixaria a página de erro na tela)
const go = (to: string) => clearError({ redirect: to })
</script>

<template>
  <div>
    <SceneBackground :photos="['0870']" />

    <TopNav :home="{ to: '/', label: 'bernardo' }" />

    <main class="err" data-shot="0">
      <div class="drop err-pol-drop">
        <figure class="err-pol" aria-hidden="true">
          <span class="burn" />
          <figcaption class="hand">DSCN{{ String(error.statusCode).padStart(4, '0') }} queimou</figcaption>
        </figure>
        <span class="tape" />
      </div>

      <div class="drop err-drop">
        <div class="err-scrap">
          <!-- 404: a página não existe. Qualquer outro erro (500...): quebrou do meu lado -->
          <template v-if="lost">
            <h1>essa não saiu na foto.</h1>
            <p class="mono">erro {{ error.statusCode }} - - - essa página não foi encontrada</p>
            <p class="err-txt">
              Pode ter sido um link antigo ou um texto que ainda não publiquei. O resto do site continua aqui.
            </p>
          </template>
          <template v-else>
            <h1>a câmera travou.</h1>
            <p class="mono">erro {{ error.statusCode }} - - - deu problema do meu lado</p>
            <p class="err-txt">
              Não foi nada que você fez. Tenta de novo daqui a pouco; se continuar, me manda um oi que eu arrumo.
            </p>
          </template>
          <nav class="err-go" aria-label="voltar">
            <a href="/" class="label" @click.prevent="go('/')">← voltar pro começo</a>
          </nav>
        </div>
        <span class="tape" />
      </div>
    </main>

    <!-- desmaiado: deitado, olhos em X, não reage a nada -->
    <WalkerAvatar fainted />
  </div>
</template>

<style>
.err { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; gap: 6vw; padding: 110px 6vw 160px; }

/* polaroid superexposta: quase branca, com vazamento de luz laranja no canto */
.err-pol-drop { position: relative; transform: rotate(-6deg); }
.err-pol-drop .tape { left: 34%; top: -14px; transform: rotate(4deg); }
.err-pol { position: relative; width: 250px; margin: 0; padding: 14px 14px 58px; background: var(--noise), #fdfcf8; }
.err-pol .burn { display: block; aspect-ratio: 1; position: relative; overflow: hidden;
  background: radial-gradient(120% 90% at 30% 25%, #fffef9 0 30%, #f7efe0 60%, #e9dcc4 100%); }
.err-pol .burn::before { content: ""; position: absolute; inset: 0;
  background: radial-gradient(70% 60% at 100% 100%, rgba(232,110,40,.55), rgba(240,160,70,.25) 45%, transparent 75%),
              radial-gradient(40% 35% at 96% 8%, rgba(214,70,40,.35), transparent 70%); mix-blend-mode: multiply; }
/* um fantasma do horizonte que quase apareceu */
.err-pol .burn::after { content: ""; position: absolute; left: -10%; right: -10%; top: 58%; height: 22%;
  background: linear-gradient(transparent, rgba(120,110,95,.12) 40%, rgba(120,110,95,.06) 70%, transparent); filter: blur(3px); transform: rotate(-3deg); }
.err-pol figcaption { position: absolute; left: 16px; bottom: 14px; font-size: 25px; color: var(--pencil); }

.err-drop { position: relative; }
.err-drop > .tape { left: 40%; top: -12px; transform: rotate(-4deg); }
.err-scrap { position: relative; width: min(470px, 88vw); padding: 36px 34px 34px; background: var(--noise), var(--paper); transform: rotate(1.4deg);
  clip-path: polygon(0 3%, 6% 0, 13% 2%, 22% 0, 31% 3%, 40% 1%, 52% 3%, 61% 0, 72% 2%, 83% 0, 92% 3%, 100% 1%, 100% 100%, 0 100%); }
.err-scrap h1 { font-family: "Caveat", cursive; font-weight: 600; font-size: 56px; line-height: .95; color: var(--pen); }
.err-scrap .mono { display: block; margin-top: 14px; color: var(--muted); }
.err-txt { margin-top: 14px; font-size: 19px; line-height: 1.5; }
.err-go { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 12px; margin-top: 24px; }
.err-go .label { font-size: 16px; box-shadow: 0 1px 0 #d8cfbd, 0 2px 6px rgba(0,0,0,.12); }
.err-go .label:nth-child(1) { transform: rotate(-1.5deg); }
.err-go .label:nth-child(2) { transform: rotate(1deg); }

@media (max-width: 800px) {
  .err { flex-direction: column; gap: 56px; }
  .err-pol { width: 200px; }
}
/* celular: só o recado, sem a polaroid queimada */
@media (max-width: 700px) {
  .err-pol-drop { display: none; }
}
</style>
