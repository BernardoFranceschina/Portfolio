<template>
  <footer class="bg-[#050505] border-t border-white/5 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden">
    
    <div class="max-w-7xl mx-auto relative z-10">
      
      <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16 pb-16 border-b border-white/5">
        <div class="max-w-3xl">
          <p class="text-yellow-500/80 font-mono text-xs tracking-widest uppercase mb-4">
            {{ t('footer.next_step') }}
          </p>
          <h2 class="text-4xl md:text-6xl font-display font-light text-white leading-[1.1]">
            {{ t('footer.cta_heading') }}
            <span class="block text-gray-400 italic font-serif mt-2">{{ t('footer.cta_highlight') }}</span>
          </h2>
        </div>

        <a 
          :href="`mailto:${email}`" 
          class="group relative inline-flex items-center gap-4 px-8 py-5 bg-white text-black rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:scale-105"
        >
          <span class="font-bold tracking-wide text-sm md:text-base">{{ t('footer.send_email') }}</span>
          <div class="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:bg-black/20 transition-colors">
            <Icon name="ph:arrow-up-right-bold" class="w-4 h-4" />
          </div>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
        
        <div class="md:col-span-5 lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-display text-white mb-4">Bernardo Franceschina</h3>
            <p class="text-gray-400 text-sm leading-relaxed font-light max-w-sm">
              {{ t('footer.role') }}
            </p>
          </div>
          
          <div class="mt-8 flex items-center gap-2 text-xs font-mono text-green-400/80">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {{ t('footer.status') }}
          </div>
        </div>

        <div class="md:col-span-3 lg:col-span-4 md:pl-12">
           <h4 class="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
            {{ t('footer.connect') }}
          </h4>
          <ul class="space-y-4">
            <li>
              <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-fit">
                <Icon name="mdi:linkedin" class="text-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <span class="text-sm font-medium">LinkedIn</span>
                <Icon name="ph:arrow-right" class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-500" />
              </a>
            </li>
             <li>
              <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-fit">
                <Icon name="mdi:github" class="text-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <span class="text-sm font-medium">GitHub</span>
                <Icon name="ph:arrow-right" class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-500" />
              </a>
            </li>
             <li>
              <a :href="sourceCodeUrl" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-fit">
                <Icon name="ph:code" class="text-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                <span class="text-sm font-medium">{{ t('footer.source_code') }}</span>
                <Icon name="ph:arrow-right" class="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-yellow-500" />
              </a>
            </li>
          </ul>
        </div>

        <div class="md:col-span-4 lg:col-span-4">
          <h4 class="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
            {{ t('footer.contact') }}
          </h4>
           
           <button 
            @click="copyEmail" 
            class="group w-full text-left focus:outline-none"
          >
            <div class="flex flex-col py-2 border-white/10 group-hover:border-white/40 transition-colors duration-300">
               
               <div class="flex items-center justify-between mb-2">
                 <span 
                   class="text-[10px] font-mono uppercase tracking-wider transition-colors duration-300"
                   :class="copied ? 'text-green-400 font-bold' : 'text-gray-400 group-hover:text-gray-400'"
                 >
                   {{ copied ? t('footer.copied') : t('footer.main_email') }}
                 </span>
                 
                 <Icon 
                   :name="copied ? 'ph:check-bold' : 'ph:copy-simple'" 
                   class="w-5 h-5 transition-all duration-300" 
                   :class="copied ? 'text-green-400 scale-110' : 'text-gray-400 group-hover:text-white'" 
                 />
               </div>
               
               <span 
                 class="text-xl md:text-2xl font-display truncate transition-colors duration-300"
                 :class="copied ? 'text-green-400' : 'text-gray-200 group-hover:text-white'"
               >
                 {{ email }}
               </span>
            </div>
          </button>

        </div>

      </div>

      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400 font-mono">
        <p>© {{ currentYear }} Bernardo Franceschina. {{ t('footer.rights') }}</p>
        
        <div class="flex items-center gap-6">
           <span class="flex items-center gap-2">
             <Icon name="ph:map-pin" class="text-white"/>
             {{ t('footer.location') }}
           </span>
           <span class="w-[1px] h-3 bg-white/10 hidden md:block"></span>
           <span class="flex items-center gap-2 text-gray-400">
            {{ t('footer.made_with') }}
            <Icon name="logos:nuxt-icon" class="grayscale w-4 h-4 hover:grayscale-0 transition-all" /> & 
            <Icon name="logos:tailwindcss-icon" class="grayscale w-4 h-4 hover:grayscale-0 transition-all" />
           </span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global'
})

const email = "bernardofranceschina@gmail.com"
const sourceCodeUrl = "https://github.com/bernardofranceschina/portfolio"
const linkedinUrl = "https://linkedin.com/in/bernardo-franceschina/"
const githubUrl = "https://github.com/bernardofranceschina"

const { copy, copied } = useClipboard({ source: email })
const copyEmail = () => {
  copy()
}

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.font-display {
  font-family: 'Fraunces', serif;
}
</style>