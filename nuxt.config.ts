// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync, readFileSync } from 'node:fs'

// textos publicados do caderno (sem `hide: true` no frontmatter), para pré-gerar a imagem de compartilhamento de cada um
const publicados = readdirSync('content/caderno')
  .filter(f => f.endsWith('.md') && !/^hide:\s*true\s*$/m.test(readFileSync(`content/caderno/${f}`, 'utf8').split(/^---\s*$/m)[1] ?? ''))
  .map(f => f.slice(0, -3))

export default defineNuxtConfig({
  compatibilityDate: '2026-02-06',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://franceschina.dev',
    name: 'Bernardo Franceschina',
    description: 'Engenheiro de software em Florianópolis. Full stack na Wiidoo Labs, IA que responde com fonte, telemetria no LISHA/UFSC e um varal de fotos.',
    defaultLocale: 'pt-BR',
    separator: '·',
    indexable: true,
  },

  // o título de cada página é sempre definido por ela (sem o "404 - Page not found" automático)
  seo: { fallbackTitle: false },

  // quem é o site: vai no Schema.org de todas as páginas e vira o autor dos textos do caderno
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Bernardo Franceschina',
      jobTitle: 'Engenheiro de software',
      url: 'https://franceschina.dev',
      email: 'mailto:bernardofranceschina@gmail.com',
      worksFor: { '@type': 'Organization', name: 'Wiidoo Labs' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade Federal de Santa Catarina', alternateName: 'UFSC' },
      address: { '@type': 'PostalAddress', addressLocality: 'Florianópolis', addressRegion: 'SC', addressCountry: 'BR' },
      knowsAbout: ['Engenharia de software', 'Desenvolvimento full stack', 'RAG', 'Avaliação de LLM', 'Telemetria', 'Laravel', 'Vue', 'TypeScript', 'Python'],
      sameAs: ['https://github.com/bernardofranceschina', 'https://www.linkedin.com/in/bernardo-franceschina'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { name: 'theme-color', content: '#2b3f57' },
      ],
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
    },
  },

  // JPEG: o PNG da foto passava de 1 MB (o WhatsApp não mostra prévia de imagem pesada)
  ogImage: {
    defaults: { extension: 'jpeg', width: 1200, height: 630, sharp: { quality: 82 } },
    fonts: ['Caveat:600', 'Newsreader:400', 'Courier Prime:400'],
    // todas as páginas são pré-geradas, então as imagens também: geradas no build (onde o sharp faz o JPEG;
    // na função da Vercel ele não roda e a imagem voltaria a ser um PNG de 1 MB), sem nada em tempo de execução
    zeroRuntime: true,
    // sem isto, no preset da Vercel o sharp fica desligado também no build e a imagem sai PNG
    compatibility: { prerender: { sharp: 'node' } },
    // sem o cache em disco (node_modules/.cache), que servia a imagem antiga depois de mudar o componente
    runtimeCacheStorage: false,
  },

  routeRules: {
    '/': { prerender: true },
    '/caderno/**': { prerender: true },
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/fotos/**': { headers: { 'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400' } },
    '/favicon.ico': { headers: { 'Cache-Control': 'public, max-age=2592000' } },
    // endereços do site antigo (versão em inglês e currículos) que ainda podem estar indexados ou linkados
    '/en': { redirect: { to: '/', statusCode: 301 } },
    '/en/**': { redirect: { to: '/', statusCode: 301 } },
    '/cv_bernardo_franceschina_pt_br.pdf': { redirect: { to: '/', statusCode: 301 } },
    '/cv_bernardo_franceschina_en_us.pdf': { redirect: { to: '/', statusCode: 301 } },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      // as imagens de compartilhamento vão explícitas (no `nuxt build`, o da Vercel, o crawler não as encontra) e
      // depois das páginas: cada imagem lê as opções que a página dela deixou ao ser gerada. Uma rota por vez
      // garante essa ordem (são poucas)
      concurrency: 1,
      routes: [
        '/',
        ...publicados.map(s => `/caderno/${s}`),
        '/__og-image__/static/og.jpeg',
        ...publicados.map(s => `/__og-image__/static/caderno/${s}/og.jpeg`),
      ],
    },
    compressPublicAssets: true,
  },
})
