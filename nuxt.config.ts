// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '20206-02-06',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/seo'
  ],
  site: {
    url: 'https://franceschina.dev',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  i18n: {
    baseUrl: 'https://franceschina.dev',
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    strategy: 'prefix_except_default', // PT fica em '/', EN fica em '/en'
    defaultLocale: 'pt',
    locales: [
      { code: 'pt', iso: 'pt-BR', file: 'pt.json', name: 'PT' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'EN' }
    ],
    detectBrowserLanguage: false
  },
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ['normal', 'italic'],
    },
    experimental: {
      processCSSVariables: true,
    }
  },
})