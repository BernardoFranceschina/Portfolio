<template>
  <section class="relative bg-[#0a0a0c] text-white overflow-hidden py-16 md:py-24">
    
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/[0.015] rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

      <div v-reveal class="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-14"></div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">

        <!-- Left column - Bio -->
        <div class="lg:col-span-7">
          <div v-reveal>
            <span class="font-mono text-[11px] text-yellow-500/80 mb-5 block tracking-[0.3em] uppercase">
              {{ t('about.label') }}
            </span>

            <h2 class="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-light leading-[1.1] mb-10">
              <i18n-t keypath="about.heading" tag="span" scope="global">
                <template #highlight>
                  <span class="italic font-serif text-gray-400">{{ t('about.heading_highlight') }}</span>
                </template>
              </i18n-t>
            </h2>
          </div>

          <div v-reveal class="space-y-5 text-gray-400 text-[15px] md:text-base leading-[1.8] font-light max-w-2xl">
            <p>{{ t('about.bio_1') }}</p>
            <p>
              <i18n-t keypath="about.bio_2" tag="span" scope="global">
                <template #highlight>
                  <span class="text-white font-normal">{{ t('about.bio_highlight') }}</span>
                </template>
              </i18n-t>
            </p>
          </div>

          <!-- Stats -->
          <div v-reveal class="flex gap-12 md:gap-16 mt-12 pt-8 border-t border-white/[0.06]">
            <div v-for="(stat, key) in stats" :key="key" class="group">
              <span class="block text-3xl md:text-4xl font-display text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                {{ t(`about.stats.${key}`) }}
              </span>
              <span class="block text-[11px] font-mono text-gray-400 uppercase tracking-[0.15em]">
                {{ t(`about.stats.${key}_label`) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right column - Timeline -->
        <div class="lg:col-span-5 lg:pl-10">
          <div v-reveal class="lg:sticky lg:top-32">
            <h3 class="text-[11px] font-mono uppercase text-gray-400 tracking-[0.3em] mb-8 flex items-center gap-4">
              {{ t('about.timeline.title') }}
              <span class="h-[1px] flex-1 bg-white/[0.06]"></span>
            </h3>

            <div class="space-y-1">
              <div 
                v-for="(item, key) in timelineItems" 
                :key="key"
                class="group relative rounded-xl p-4 -mx-4 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div class="flex items-center gap-3 mb-2">
                  <span class="font-mono text-[10px] text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full tracking-[0.15em] font-medium">
                    {{ t(`about.timeline.${key}.year`) }}
                  </span>
                  <span class="h-[1px] flex-1 bg-white/[0.04] group-hover:bg-yellow-500/20 transition-colors"></span>
                </div>

                <h4 class="text-white font-medium mb-1.5 group-hover:text-yellow-400 transition-colors text-sm leading-snug">
                  {{ t(`about.timeline.${key}.role`) }}
                </h4>
                <p class="text-gray-400 text-[13px] leading-relaxed font-light">
                  {{ t(`about.timeline.${key}.desc`) }}
                </p>
              </div>
            </div>

            <!-- Available status -->
            <div class="mt-8 pt-6 border-t border-white/[0.04]">
              <div class="flex items-center gap-2.5 text-[11px] font-mono text-green-400 tracking-wide">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {{ t('footer.status') }}
              </div>
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

const stats = { experience: {}, projects: {}, stack: {} }
const timelineItems = { ufsc: {}, freelance: {}, d3t: {} }
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }
</style>