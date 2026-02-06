<template>
  <section class="bg-[#0f0f11] py-24 px-4 md:px-8 relative z-10">
    
    <div class="max-w-6xl mx-auto">
      <div class="mb-16 md:mb-24 flex items-end justify-between border-b border-white/10 pb-8">
        <h2 class="text-4xl md:text-6xl font-display text-white">
          {{ t('projects.section_title') }} 
          <span class="italic font-serif text-gray-500">{{ t('projects.section_subtitle') }}</span>
        </h2>
        <span class="hidden md:block font-mono text-xs text-gray-400">
          (0{{ projects.length }})
        </span>
      </div>

      <div class="flex flex-col gap-12">
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="sticky-card sticky top-24 md:top-32" 
        >
          <div 
            class="group relative w-full min-h-[60vh] lg:min-h-0 lg:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.01] lg:hover:scale-[1.02] cursor-pointer"
            :class="project.color"
            @click="$emit('open-project', project)"
          >
            
            <div class="absolute inset-0 flex flex-col lg:flex-row">
              <div class="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between z-20 bg-gradient-to-b lg:bg-gradient-to-r from-black/90 via-black/50 to-transparent">
                <div class="flex justify-between items-start">
                  <span class="font-mono text-xs border border-white/20 px-3 py-1 rounded-full uppercase tracking-wider text-white/80">
                    {{ t(`projects.items.${project.id}.category`) }}
                  </span>
                  <span class="font-display text-4xl md:text-5xl text-white/10 font-bold">0{{ index + 1 }}</span>
                </div>

                <div class="mt-8 mb-8 lg:my-0 relative">
                  <h3 class="text-3xl md:text-5xl lg:text-5xl font-display text-white mb-4 leading-tight group-hover:underline decoration-yellow-500/50 underline-offset-8">
                    {{ t(`projects.items.${project.id}.title`) }}
                  </h3>
                  <p class="text-gray-300 font-sans text-base md:text-lg lg:text-lg max-w-xl leading-relaxed mb-6">
                    {{ t(`projects.items.${project.id}.description`) }}
                  </p>
                  
                  <div class="flex gap-2 flex-wrap">
                    <span v-for="tag in project.tags" :key="tag" class="text-xs font-mono text-gray-400">#{{ tag }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 text-white font-bold group/btn">
                  <span class="border-b border-transparent group-hover/btn:border-yellow-400 transition-all text-base">
                    {{ t('projects.view_case') }}
                  </span>
                  <Icon name="ph:arrow-right" class="group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </div>

              <div class="w-full lg:w-1/2 h-full absolute lg:relative inset-0 z-0 lg:z-auto">
                <NuxtImg 
                  :src="project.image"
                  alt="Imagem capa do projeto" 
                  sizes="100vw sm:90vw md:80vw lg:1200px"
                  format="webp"
                  loading="lazy"
                  densities="x1 x2"
                  class="w-full h-full object-cover opacity-50 lg:opacity-100 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                 />
                 <div class="absolute inset-0 bg-[#0f0f11]/40 lg:hidden"></div>
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

const { projects } = useProjects()

const { t } = useI18n({
  useScope: 'global'
})
const emit = defineEmits(['open-project'])


</script>

<style scoped>
.sticky-card {
  min-height: 60vh; 
}
.font-display {
  font-family: 'Fraunces', serif;
}
</style>