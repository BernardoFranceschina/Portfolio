<template>
  <section class="relative bg-[#0a0a0c] text-white overflow-hidden py-16 md:py-24">

    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

      <div v-reveal class="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-14"></div>

      <div v-reveal class="mb-12">
        <span class="font-mono text-[11px] text-yellow-500/80 mb-5 block tracking-[0.3em] uppercase">
          {{ t('stack.label') }}
        </span>
        <h2 class="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-light leading-[1.1] mb-4">
          {{ t('stack.heading') }}
          <span class="italic font-serif text-gray-400 ml-2">{{ t('stack.heading_highlight') }}</span>
        </h2>
        <p class="text-gray-400 text-[15px] md:text-base leading-relaxed font-light max-w-xl">
          {{ t('stack.description') }}
        </p>
      </div>

      <!-- Stack grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        <div 
          v-for="category in categories" 
          :key="category.key"
          v-reveal
          class="group"
        >
          <h3 class="text-[11px] font-mono uppercase text-gray-400 tracking-[0.2em] mb-5 flex items-center gap-3">
            <Icon :name="category.icon" class="w-3.5 h-3.5 text-yellow-500/60" />
            {{ t(`stack.categories.${category.key}`) }}
          </h3>

          <div class="space-y-2">
            <div
              v-for="tech in category.items"
              :key="tech.name"
              class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
            >
              <Icon :name="tech.icon" class="w-5 h-5 shrink-0 text-gray-300 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span class="text-[13px] text-gray-300 font-light">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n({ useScope: 'global' })
const { vReveal } = useScrollReveal()

const categories = [
  {
    key: 'backend',
    icon: 'ph:terminal',
    items: [
      { name: 'Laravel', icon: 'logos:laravel' },
      { name: 'Django', icon: 'logos:django-icon' },
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'PHP', icon: 'logos:php' },
      { name: 'Python', icon: 'logos:python' },
    ]
  },
  {
    key: 'frontend',
    icon: 'ph:browser',
    items: [
      { name: 'Vue.js', icon: 'logos:vue' },
      { name: 'Nuxt', icon: 'logos:nuxt-icon' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
      { name: 'Vuetify', icon: 'logos:vuetifyjs' },
    ]
  },
  {
    key: 'infra',
    icon: 'ph:cloud',
    items: [
      { name: 'Docker', icon: 'logos:docker-icon' },
      { name: 'DigitalOcean', icon: 'logos:digital-ocean-icon' },
      { name: 'Nginx', icon: 'logos:nginx' },
      { name: 'AWS', icon: 'simple-icons:amazonaws' },
      { name: 'GitLab CI/CD', icon: 'logos:gitlab' },
      { name: 'Vercel', icon: 'simple-icons:vercel' },
    ]
  },
  {
    key: 'databases',
    icon: 'ph:database',
    items: [
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'MySQL', icon: 'logos:mysql' },
      { name: 'Redis', icon: 'logos:redis' },
      { name: 'Sanity CMS', icon: 'simple-icons:sanity' },
    ]
  },
]
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }
</style>