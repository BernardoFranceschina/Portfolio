import type { RouterConfig } from '@nuxt/schema'

// âncoras (#sobre, #caderno, #oi) rolam até o bloco, inclusive ao abrir a página já com o hash
export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise((resolve) => {
        // `scroll-margin-top` do bloco soma ao respiro (ex.: o varal tem a etiqueta acima dele)
        setTimeout(() => {
          const el = document.querySelector(to.hash)
          const extra = el ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : 0
          resolve({ el: to.hash, top: 40 + extra, behavior: 'smooth' })
        }, 50)
      })
    }
    // primeira carga (inclusive F5): deixa o navegador devolver o scroll onde a pessoa estava
    if (!from.matched.length) return false
    return { top: 0 }
  },
} satisfies RouterConfig
