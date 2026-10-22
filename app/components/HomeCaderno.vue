<script setup lang="ts">
/**
 * Caderno na home: só os textos que existem, do mais novo para o mais antigo, e um cartãozinho para sugerir assunto.
 * Sem textos, a lista some e fica só o topo e a sugestão.
 */
const props = defineProps<{ email: string }>()

// filtrado na consulta: textos escondidos não vão nem para o payload da página
const { data: posts } = await useAsyncData('caderno-home', () =>
  queryCollection('caderno').where('hide', '=', false).order('date', 'DESC').limit(5).all(), { default: () => [] })

// sugestão: por enquanto abre o e-mail da pessoa já preenchido
const idea = ref('')
function suggest() {
  const t = idea.value.trim()
  if (!t) return
  location.href = `mailto:${props.email}?subject=${encodeURIComponent('sugestão de pauta')}&body=${encodeURIComponent(t)}`
}
</script>

<template>
  <section id="caderno" class="wrap cad" data-shot="3">
    <div class="drop">
      <div class="cad-in">
        <h2 class="hand">caderno</h2>
        <p class="cad-intro">Textos sobre o que eu estudo e construo. Às vezes, sobre outras coisas.</p>

        <ol v-if="posts.length" class="cad-list">
          <li v-for="p in posts" :key="p.path">
            <NuxtLink :to="p.path">
              <h3>{{ p.title }}</h3>
              <p>{{ p.description }}</p>
              <span class="cad-meta mono">{{ dataCurta(p.date) }}<template v-if="p.minutes"> · {{ p.minutes }} min</template> · {{ p.tag }}</span>
            </NuxtLink>
          </li>
        </ol>

      </div>
    </div>

    <!-- sugestão de assunto: cartão separado, sobrepondo o canto da folha -->
    <div class="sug-wrap">
      <div class="drop">
        <form class="sug" @submit.prevent="suggest">
          <label for="sug-in" class="hand">sugere um assunto?</label>
          <input id="sug-in" v-model="idea" type="text" maxlength="200" placeholder="eu queria ler sobre…" autocomplete="off">
          <button type="submit" class="mono" :disabled="!idea.trim()">enviar →</button>
        </form>
      </div>
      <span class="sug-pin" aria-hidden="true" />
    </div>
    <span class="note-m cad-note">sugestões de pauta são bem-vindas <span class="seta-lado">→</span><span class="seta-cima">↑</span></span>
  </section>
</template>

<style>
.cad { margin-left: 22vw; max-width: 720px; margin-bottom: 110px; transform: rotate(.5deg); }
.cad .cad-note { right: 170px; bottom: -84px; transform: rotate(-4deg); max-width: none; white-space: nowrap; }
.cad h2 { font-size: 46px; line-height: 1; font-weight: 600; color: var(--pen); }
.cad-intro { margin: 10px 0 0; font-size: 19px; }
.cad-list { list-style: none; margin-top: 26px; }
.cad-list a { display: block; padding: 18px 0; text-decoration: none; }
.cad-list h3 { font-family: "Newsreader", serif; font-weight: 600; font-size: 23px; line-height: 1.25; }
.cad-list p { font-size: 17.5px; line-height: 1.45; margin-top: 4px; }
.cad-meta { display: block; margin-top: 8px; font-size: 12.5px; letter-spacing: .04em; }
.cad-list a:hover h3 { text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 4px; }
/* cartão de sugestão: quadriculado, igual ao "ah, e tem mais" */
.sug-wrap { position: absolute; right: -150px; bottom: -110px; z-index: 3; width: 300px; transform: rotate(2.4deg); }
.sug { display: flex; flex-direction: column; gap: 10px; padding: 24px 24px 18px;
  background: var(--noise), linear-gradient(#dfe7ef 1px, transparent 1px) 0 0 / 16px 16px, linear-gradient(90deg, #dfe7ef 1px, transparent 1px) 0 0 / 16px 16px, #fbfcfd; }
.sug label { font-size: 30px; line-height: 1; font-weight: 600; color: var(--pen); }
.sug input { font: 17px/1.4 "Newsreader", serif; padding: 6px 2px; border: 0; border-bottom: 1.5px solid #b9c6d3; background: transparent; color: var(--ink); outline: none; }
/* foco visível de verdade: a linha engrossa e fica azul (sem o contorno padrão, que brigaria com o papel) */
.sug input:focus { border-color: var(--pen); box-shadow: 0 1.5px 0 var(--pen); }
.sug button { align-self: flex-end; border: 0; background: none; padding: 4px 2px; font-size: 14px; color: var(--ink); cursor: pointer; }
.sug button:disabled { opacity: .4; cursor: default; }
.sug button:not(:disabled):hover { text-decoration: underline; text-underline-offset: 4px; }
.sug-pin { position: absolute; left: 50%; top: -7px; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; z-index: 4;
  background: radial-gradient(circle at 35% 30%, #f08a74, var(--red) 55%, #8e3523); box-shadow: 0 3px 4px -1px rgba(0,0,0,.45); }

/* folha lisa */
.cad .cad-in { padding: 40px 48px 40px; background: var(--noise), var(--paper); }
.cad .cad-intro, .cad .cad-list p, .cad .cad-meta { color: var(--muted); }
.cad .cad-list li + li { border-top: 1px solid #e6dfd0; }

.cad .seta-cima { display: none; }

@media (max-width: 700px) {
  .cad { margin-left: 12px; margin-right: 12px; max-width: none; transform: none; }
  .cad .cad-in { padding: 30px 22px; }
  .sug-wrap { position: relative; right: auto; bottom: auto; width: auto; max-width: 340px; margin: -18px 8px 0 auto; }
  /* aqui o cartão fica em cima do recado, não ao lado */
  .cad .cad-note { white-space: normal; text-wrap: balance; }
  .cad .seta-lado { display: none; }
  .cad .seta-cima { display: inline; }
}
</style>
