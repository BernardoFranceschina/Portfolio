<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global'
})
</script>

<template>
  <section class="relative bg-[#0f0f11] text-white overflow-hidden py-16 md:py-32">
    
    <div class="absolute top-0 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none">
      <div class="flex animate-marquee whitespace-nowrap">
        <span class="text-[6rem] md:text-[12rem] lg:text-[15rem] font-black font-sans uppercase leading-none pr-8">
          {{ t('intro.marquee') }}
        </span>
        <span aria-hidden="true" class="text-[6rem] md:text-[12rem] lg:text-[15rem] font-black font-sans uppercase leading-none pr-8">
          {{ t('intro.marquee') }}
        </span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <div class="w-full h-[1px] bg-white/10 mb-12"></div>
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div class="md:col-span-4 flex flex-col justify-between h-full">
          <div>
            <span class="font-mono text-xs text-yellow-500 mb-2 block tracking-widest uppercase">
              {{ t('intro.label') }}
            </span>
            
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-light leading-tight">
              <i18n-t keypath="intro.heading" tag="span">
                <template #break>
                  <br />
                </template>
                <template #highlight>
                  <span class="italic font-serif text-gray-400">
                    {{ t('intro.heading_highlight') }}
                  </span>
                </template>
              </i18n-t>
            </h2>
          </div>

          <div class="hidden md:block mt-12">
            <div class="flex items-center gap-4 text-sm text-gray-400 font-mono">
              <span class="block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {{ t('intro.system') }}
            </div>
          </div>
        </div>

        <div class="md:col-span-8 relative">
          <div class="hidden md:block absolute left-[-1.5rem] top-0 bottom-0 w-[1px] bg-white/10"></div>
          
          <p class="text-lg md:text-2xl lg:text-3xl leading-relaxed font-light text-gray-200">
            <i18n-t keypath="intro.title" tag="span">
              <template #highlight>
                <span class="text-white font-serif italic border-b border-yellow-500/30 pb-1">
                  {{ t('intro.title_highlight') }}
                </span>
              </template>
            </i18n-t>
          </p>

          <p class="mt-6 md:mt-8 text-base md:text-lg text-gray-400 font-sans max-w-2xl leading-relaxed">
            <i18n-t keypath="intro.subtitle" tag="span">
              <template #break>
                <br /><br />
              </template>
              <template #highlight>
                <span class="text-yellow-500 font-mono italic">
                  {{ t('intro.subtitle_highlight') }}
                </span>
              </template>
            </i18n-t>
          </p>

          <div class="mt-8 md:mt-12 flex items-center gap-4 text-white/40 group cursor-default">
            <div class="h-[1px] w-12 bg-white/20 group-hover:w-24 transition-all duration-500"></div>
            <span class="font-mono text-xs tracking-widest group-hover:text-white transition-colors uppercase">
              {{ t('intro.scroll') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  will-change: transform;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.font-display {
  font-family: 'Fraunces', serif;
}
</style>