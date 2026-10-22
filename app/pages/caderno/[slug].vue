<script setup lang="ts">
const route = useRoute()
const nuxtApp = useNuxtApp()

// site estático: um texto que não foi pré-gerado (escondido ou que não existe) abre pelo 404.html, sem
// servidor. Aí já é 404, sem baixar o banco do Nuxt Content (~400 KB) só para descobrir isso
if (import.meta.client && !import.meta.dev && !nuxtApp.payload.serverRendered) {
  throw createError({ statusCode: 404, message: 'Texto não encontrado', fatal: true })
}

const { data: post } = await useAsyncData(`caderno-${route.path}`, () =>
  queryCollection('caderno').path(route.path).first(),
)
// textos com `hide: true` não têm página
if (!post.value || post.value.hide) {
  throw createError({ statusCode: 404, message: 'Texto não encontrado', fatal: true })
}

// o próximo texto é o publicado logo depois deste
const { data: next } = await useAsyncData(`caderno-next-${route.path}`, () =>
  queryCollection('caderno').where('hide', '=', false).where('date', '>', post.value!.date).order('date', 'ASC').first(),
)

const date = dataCurta(post.value.date)

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  articlePublishedTime: post.value.date,
  articleAuthor: ['https://franceschina.dev'],
  articleSection: 'caderno',
  articleTag: [post.value.tag],
  author: 'Bernardo Franceschina',
})
defineOgImageComponent('Postal', { photo: post.value.photo, title: post.value.title })
// o autor é a pessoa definida em nuxt.config.ts (schemaOrg.identity)
useSchemaOrg([
  defineArticle({
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.description,
    datePublished: post.value.date,
    inLanguage: 'pt-BR',
    keywords: [post.value.tag],
  }),
])
</script>

<template>
  <div v-if="post">
    <SceneBackground :photos="[post.photo ?? '1034']" />

    <TopNav :home="{ to: '/', label: '← bernardo' }" :links="[{ to: '/#caderno', label: 'caderno' }]" />

    <main class="post-main">
      <div class="col-wrap" data-shot="0">
        <div class="drop">
          <article class="reading-col">
            <div class="typedhead">
              <span>caderno</span><span>·</span><span>{{ date }}</span><template v-if="post.minutes"><span>·</span><span>{{ post.minutes }} min</span></template>
            </div>
            <h1>{{ post.title }}</h1>
            <p class="lede">{{ post.description }}</p>
            <ContentRenderer :value="post" class="prose" />
            <nav class="end" aria-label="navegação do caderno">
              <NuxtLink to="/#caderno">← voltar ao caderno</NuxtLink>
              <NuxtLink v-if="next" :to="next.path" class="next">
                <span>próximo texto</span><b>{{ next.title }}</b>
              </NuxtLink>
            </nav>
          </article>
        </div>
        <span class="tape" />
      </div>
    </main>

    <WalkerAvatar end-msg="terminou! valeu por ler :)" besides=".col-wrap" />
  </div>
</template>

<style>
.post-main { padding: 110px 0 40vh; }
.col-wrap { position: relative; margin-left: 8vw; max-width: 700px; }
.col-wrap > .tape { left: 46%; top: -14px; transform: rotate(-2deg); }
.reading-col { padding: 56px 60px 64px; background: var(--noise), var(--paper); }
.reading-col .typedhead { font-family: "Courier Prime", monospace; font-size: 14px; color: var(--muted); display: flex; gap: 12px; flex-wrap: wrap; border-bottom: 1.5px solid var(--ink); padding-bottom: 10px; margin-bottom: 34px; text-transform: uppercase; letter-spacing: .05em; }
.reading-col h1 { font-weight: 500; font-size: clamp(40px, 5vw, 58px); line-height: 1.02; letter-spacing: -0.02em; margin-bottom: 18px; }
.reading-col .lede { font-style: italic; font-size: 23px; color: var(--muted); line-height: 1.45; margin-bottom: 40px; }
.prose p { font-size: 21px; line-height: 1.65; margin-bottom: 20px; color: #2e2a24; }
.prose h2 { font-family: "Caveat", cursive; font-weight: 600; color: var(--pen); font-size: 38px; line-height: 1; margin: 44px 0 14px; }
.prose h2 a { text-decoration: none; }
.prose blockquote { margin: 34px 0; }
/* o :marca[] tira o <p> de dentro da citação: o estilo vale para os dois casos */
.prose blockquote, .prose blockquote p { font-size: 27px; line-height: 1.4; font-style: italic; }
.end { margin-top: 48px; padding-top: 22px; border-top: 1px dashed #cfc5b3; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-family: "Courier Prime", monospace; font-size: 15px; }
.end a { text-decoration: none; }
.end a:hover { background: #fff0a8; }
.end .next { text-align: right; }
.end .next b { display: block; font-size: 17px; }
@media (max-width: 700px) {
  .col-wrap { margin: 0 10px; }
  .reading-col { padding: 34px 22px 40px; }
  .post-main { padding-top: 90px; }
  .prose p { font-size: 19px; }
}
</style>
