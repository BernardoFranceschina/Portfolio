import { onUnmounted } from 'vue'

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    once = true
  } = options

  const observer: IntersectionObserver | null = import.meta.client
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            if (once) {
              observer?.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('revealed')
          }
        })
      }, { threshold, rootMargin })
    : null

  onUnmounted(() => {
    observer?.disconnect()
  })

  const vReveal = {
    mounted: (el: Element) => {
      el.classList.add('reveal-target')
      if (observer) {
        observer.observe(el)
      } else {
        el.classList.add('revealed')
      }
    }
  }

  return { vReveal }
}