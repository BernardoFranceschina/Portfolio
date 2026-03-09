<template>
  <section class="bg-[#0a0a0c] relative z-10 pb-8">
    
    <!-- Section header -->
    <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-14 md:pb-20">
      
      <div v-reveal class="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-12"></div>
      
      <div v-reveal class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span class="font-mono text-[11px] text-yellow-500/80 tracking-[0.3em] uppercase block mb-5">
            {{ t('intro.label') }}
          </span>
          <h2 class="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white leading-[1.05]">
            {{ t('projects.section_title') }}
            <span class="italic font-serif text-gray-400 ml-2">{{ t('projects.section_subtitle') }}</span>
          </h2>
        </div>
        
        <div class="flex items-center gap-4 text-[11px] font-mono text-gray-400 tracking-wider pb-2">
          <span class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            {{ t('intro.system') }}
          </span>
          <span class="text-white/20">|</span>
          <span>(0{{ projects?.length || 0 }})</span>
        </div>
      </div>

      <p v-reveal class="text-gray-400 text-[15px] md:text-base leading-relaxed font-light max-w-2xl mt-6">
        <i18n-t keypath="intro.subtitle" tag="span" scope="global">
          <template #break><br /><br /></template>
          <template #highlight>
            <span class="text-yellow-500 font-mono text-sm">{{ t('intro.subtitle_highlight') }}</span>
          </template>
        </i18n-t>
      </p>
    </div>

    <!-- Projects list -->
    <div class="flex flex-col">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-item group cursor-pointer"
        @click="$emit('open-project', project)"
      >
        <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full">
          <div class="h-[1px] bg-white/[0.06]"></div>
        </div>

        <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full py-10 md:py-14 lg:py-16">
          <div 
            v-reveal
            class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <!-- Image side -->
            <div 
              class="lg:col-span-7 relative overflow-hidden rounded-2xl"
              :class="index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'"
            >
              <div class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111]">
                <NuxtImg 
                  :src="project.image"
                  :alt="project.title"
                  sizes="100vw md:80vw lg:900px"
                  format="webp"
                  loading="lazy"
                  densities="x1 x2"
                  class="w-full h-full object-cover grayscale-[30%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                />
                
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div class="absolute bottom-6 left-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span class="text-white text-sm font-medium tracking-wide">{{ t('projects.view_case') }}</span>
                  <Icon name="ph:arrow-right" class="text-yellow-400 w-4 h-4" />
                </div>

                <!-- Index number — decorative -->
                <div class="absolute top-5 right-6 font-display text-5xl md:text-6xl text-white/[0.06] font-bold group-hover:text-white/[0.12] transition-colors duration-500" aria-hidden="true">
                  0{{ index + 1 }}
                </div>
              </div>
            </div>

            <!-- Text side -->
            <div 
              class="lg:col-span-5"
              :class="index % 2 === 0 ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4'"
            >
              <div class="flex items-center gap-3 mb-4">
                <span class="font-mono text-[11px] text-yellow-500/80 tracking-[0.2em] uppercase">
                  {{ project.category }}
                </span>
                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                <span class="font-mono text-[11px] text-gray-400 tracking-wider">
                  {{ project.year }}
                </span>
              </div>

              <h3 class="text-2xl md:text-3xl lg:text-4xl font-display text-white leading-[1.15] mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                {{ project.title }}
              </h3>
              
              <p class="text-gray-400 text-[14px] md:text-[15px] leading-[1.7] font-light mb-5 max-w-md">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-5">
                <span 
                  v-for="tag in project.tags" 
                  :key="tag"
                  class="text-[11px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md group-hover:border-white/10 group-hover:text-gray-300 transition-all duration-300"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Company with context -->
              <div class="flex items-center gap-2.5 text-[12px] font-mono text-gray-400 tracking-wider">
                <Icon 
                  :name="project.work_context === 'client' ? 'ph:user' : 'ph:buildings'" 
                  class="w-4 h-4 text-gray-500" 
                />
                <span class="text-gray-500">
                  {{ project.work_context === 'client' ? t('projects.modal.company_client') : t('projects.modal.company_employer') }}:
                </span>
                <span>{{ project.company }}</span>
                <span 
                  v-if="project.work_context === 'client'" 
                  class="text-[9px] uppercase tracking-[0.1em] text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-full border border-yellow-500/20 leading-none"
                >
                  {{ t('projects.modal.freelance') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div class="h-[1px] bg-white/[0.06]"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { projects } = await useProjects()
const { t } = useI18n({ useScope: 'global' })
const { vReveal } = useScrollReveal()

const emit = defineEmits(['open-project'])
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }
.project-item { transition: background-color 0.5s ease; }
.project-item:hover { background-color: rgba(255, 255, 255, 0.01); }
</style>