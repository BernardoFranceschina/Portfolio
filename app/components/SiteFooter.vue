<template>
  <footer class="bg-[#060608] border-t border-white/[0.04] relative overflow-hidden">
    
    <!-- CTA Section -->
    <div class="relative py-20 md:py-28 px-6 md:px-12">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-yellow-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
      
      <div v-reveal class="max-w-[1400px] mx-auto relative z-10 text-center">
        <span class="font-mono text-[11px] text-yellow-500/70 tracking-[0.3em] uppercase block mb-6">
          {{ t('footer.next_step') }}
        </span>
        
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white leading-[1.1] mb-4">
          {{ t('footer.cta_heading') }}
        </h2>
        <p class="text-2xl md:text-4xl lg:text-5xl font-display font-light text-gray-400 italic font-serif mb-12">
          {{ t('footer.cta_highlight') }}
        </p>

        <a 
          :href="`mailto:${email}`" 
          class="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(250,204,21,0.15)] hover:scale-[1.02]"
        >
          <span class="font-semibold tracking-wide text-sm">{{ t('footer.send_email') }}</span>
          <div class="w-7 h-7 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
            <Icon name="ph:arrow-up-right-bold" class="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </div>

    <!-- Info grid -->
    <div class="border-t border-white/[0.04] py-12 px-6 md:px-12">
      <div class="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        
        <!-- Name & role -->
        <div class="md:col-span-4">
          <h3 class="text-xl font-display text-white mb-3">Bernardo Franceschina</h3>
          <p class="text-gray-400 text-sm font-light leading-relaxed">
            {{ t('footer.role') }}
          </p>
          
          <div class="mt-5 flex items-center gap-2.5 text-[11px] font-mono text-green-400 tracking-wide">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {{ t('footer.status') }}
          </div>
        </div>

        <!-- Links -->
        <div class="md:col-span-4 md:pl-12">
          <h4 class="text-[11px] font-mono text-gray-400 uppercase tracking-[0.2em] mb-5">
            {{ t('footer.connect') }}
          </h4>
          <ul class="space-y-3">
            <li v-for="link in socialLinks" :key="link.name">
              <a :href="link.url" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-fit">
                <Icon :name="link.icon" class="text-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                <span class="text-sm">{{ link.name }}</span>
                <Icon name="ph:arrow-up-right" class="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity text-yellow-500" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Email + CV Download -->
        <div class="md:col-span-4">
          <!-- Email -->
          <button @click="copyEmail" class="group w-full text-left focus:outline-none mb-6">
            <div class="flex flex-col">
              <div class="flex items-center justify-between mb-2">
                <span 
                  class="text-[10px] font-mono uppercase tracking-[0.15em] transition-colors duration-300"
                  :class="copied ? 'text-green-400' : 'text-gray-400 group-hover:text-gray-300'"
                >
                  {{ copied ? t('footer.copied') : t('footer.main_email') }}
                </span>
                <Icon 
                  :name="copied ? 'ph:check-bold' : 'ph:copy-simple'" 
                  class="w-4 h-4 transition-all duration-300" 
                  :class="copied ? 'text-green-400' : 'text-gray-400 group-hover:text-white'" 
                />
              </div>
              <span 
                class="text-lg md:text-xl font-display truncate transition-colors duration-300"
                :class="copied ? 'text-green-400' : 'text-gray-300 group-hover:text-white'"
              >
                {{ email }}
              </span>
            </div>
          </button>

          <!-- CV Download -->
          <a 
            :href="t('footer.cv_link')" 
            target="_blank"
            class="group inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-yellow-500/30 hover:bg-yellow-500/[0.05] transition-all duration-300 w-full"
          >
            <div class="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
              <Icon name="ph:file-pdf" class="w-4 h-4 text-yellow-500" />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-sm text-white group-hover:text-yellow-400 transition-colors font-medium">
                {{ t('footer.download_cv') }}
              </span>
              <span class="text-[10px] font-mono text-gray-400 tracking-wider uppercase">PDF</span>
            </div>
            <Icon name="ph:arrow-up-right" class="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors ml-auto shrink-0" />
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/[0.04] py-6 px-6 md:px-12">
      <div class="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 font-mono tracking-wider">
        <p>© {{ currentYear }} Bernardo Franceschina. {{ t('footer.rights') }}</p>
        
        <div class="flex items-center gap-5">
          <span class="flex items-center gap-2">
            <Icon name="ph:map-pin" class="text-gray-400 w-3.5 h-3.5"/>
            {{ t('footer.location') }}
          </span>
          <span class="w-[1px] h-3 bg-white/[0.06] hidden md:block"></span>
          <span class="flex items-center gap-2 text-gray-400">
            {{ t('footer.made_with') }}
            <Icon name="logos:nuxt-icon" class="grayscale w-3.5 h-3.5 hover:grayscale-0 transition-all" /> & 
            <Icon name="logos:tailwindcss-icon" class="grayscale w-3.5 h-3.5 hover:grayscale-0 transition-all" />
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t } = useI18n({ useScope: 'global' })
const { vReveal } = useScrollReveal()

const email = "bernardofranceschina@gmail.com"

const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/bernardo-franceschina/', icon: 'mdi:linkedin' },
  { name: 'GitHub', url: 'https://github.com/bernardofranceschina', icon: 'mdi:github' },
  { name: t('footer.source_code'), url: 'https://github.com/bernardofranceschina/portfolio', icon: 'ph:code' }
]

const { copy, copied } = useClipboard({ source: email })
const copyEmail = () => copy()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }
</style>