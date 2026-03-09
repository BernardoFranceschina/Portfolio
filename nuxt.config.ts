// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-02-06',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],

  site: {
    url: 'https://franceschina.dev',
    name: 'Bernardo Franceschina | Full Stack Developer',
    description: 'Desenvolvedor Full Stack especializado em Laravel e Vue.js.',
    defaultLocale: 'pt',
    indexable: true,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
      meta: [
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
      ],
    },
  },

  i18n: {
    baseUrl: 'https://franceschina.dev',
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'pt',
    locales: [
      { code: 'pt', iso: 'pt-BR', file: 'pt.json', name: 'PT' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'EN' }
    ],
    detectBrowserLanguage: false,
  },

  fonts: {
    defaults: {
      weights: [300, 400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    experimental: {
      processCSSVariables: true,
    },
  },

  image: {
    format: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  icon: {
    serverBundle: 'local',
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
    '/_nuxt/**': { 
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } 
    },
    '/iase/**': { headers: { 'Cache-Control': 'public, max-age=2592000' } },
    '/ndpz/**': { headers: { 'Cache-Control': 'public, max-age=2592000' } },
    '/psico/**': { headers: { 'Cache-Control': 'public, max-age=2592000' } },
    '/odonto/**': { headers: { 'Cache-Control': 'public, max-age=2592000' } },
  },

  nitro: {
    prerender: {
      failOnError: false,
      routes: ['/', '/en'],
    },
    compressPublicAssets: true,
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
          },
        },
      },
      cssCodeSplit: true,
    },
  },
})