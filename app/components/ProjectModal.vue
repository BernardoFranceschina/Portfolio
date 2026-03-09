<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[999] flex justify-end" ref="modalRef" role="dialog" :aria-label="project.title" aria-modal="true">
      <div class="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" @click="close"></div>
      
      <div id="modal-content" tabindex="-1" class="relative w-full md:w-[90vw] lg:w-[80vw] 2xl:max-w-7xl h-full bg-[#0c0c0e] overflow-y-auto shadow-2xl border-l border-white/[0.06] slide-in">
        
        <div class="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 bg-[#0c0c0e]/90 backdrop-blur-xl border-b border-white/[0.04]">
          
          <button 
            v-if="prevProject" 
            @click="$emit('navigate', prevProject)" 
            class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all group/nav"
          >
            <Icon name="ph:caret-left-bold" class="w-3.5 h-3.5" />
            <span class="text-[12px] font-mono truncate max-w-[180px]">{{ prevProject.title }}</span>
          </button>
          <button 
            v-else-if="!prevProject && nextProject" 
            class="hidden md:block w-8"
            disabled
          ></button>
          <button 
            v-if="prevProject" 
            @click="$emit('navigate', prevProject)"
            class="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <Icon name="ph:caret-left-bold" class="w-4 h-4" />
          </button>
          <div v-else class="w-9 md:w-8"></div>

          <span class="font-mono text-[10px] text-gray-500 tracking-[0.2em] uppercase hidden sm:block">
            {{ project.category }}
          </span>

          <div class="flex items-center gap-1.5">
            <button 
              v-if="nextProject" 
              @click="$emit('navigate', nextProject)"
              class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all group/nav"
            >
              <span class="text-[12px] font-mono truncate max-w-[180px]">{{ nextProject.title }}</span>
              <Icon name="ph:caret-right-bold" class="w-3.5 h-3.5" />
            </button>
            <button 
              v-if="nextProject" 
              @click="$emit('navigate', nextProject)" 
              class="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-500 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              <Icon name="ph:caret-right-bold" class="w-4 h-4" />
            </button>
            
            <button @click="close" class="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] hover:bg-white border border-white/[0.06] hover:text-black text-gray-400 hover:border-white transition-all duration-300 ml-1 group">
              <Icon name="ph:x-bold" class="text-sm group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div class="h-[35vh] md:h-[50vh] relative w-full group cursor-zoom-in" @click="openZoom(project.image)">
          <NuxtImg :src="project.image" class="w-full h-full object-cover"/>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            <div class="bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10">
              <Icon name="ph:magnifying-glass-plus-bold" class="text-white text-lg" />
            </div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/50 to-transparent flex items-end p-6 md:p-12 lg:p-16 pointer-events-none">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <span class="font-mono text-[11px] text-yellow-500/80 tracking-[0.2em] uppercase">{{ project.category }}</span>
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] font-display text-white leading-[1.1] max-w-3xl">
                {{ project.title }}
              </h1>
            </div>
          </div>
        </div>

        <div class="border-b border-white/[0.06] bg-[#0c0c0e]">
          <div class="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              
              <!-- Year -->
              <div class="flex flex-col gap-1.5">
                <span class="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                  {{ t('projects.modal.year') }}
                </span>
                <span class="text-sm text-white font-medium">{{ project.year }}</span>
              </div>

              <!-- Company / Client -->
              <div class="flex flex-col gap-1.5">
                <span class="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                  {{ project.work_context === 'client' ? t('projects.modal.company_client') : t('projects.modal.company_employer') }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-white font-medium">{{ project.company }}</span>
                  <span 
                    v-if="project.work_context === 'client'" 
                    class="text-[9px] font-mono uppercase tracking-[0.15em] text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20"
                  >
                    {{ t('projects.modal.freelance') }}
                  </span>
                </div>
              </div>

              <!-- Role -->
              <div class="flex flex-col gap-1.5">
                <span class="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                  {{ t('projects.modal.role_label') }}
                </span>
                <span class="text-sm text-white font-medium">{{ project.role }}</span>
              </div>

              <!-- Status -->
              <div class="flex flex-col gap-1.5">
                <span class="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                  {{ t('projects.modal.status') }}
                </span>
                <span class="flex items-center gap-1.5 text-sm">
                  <span class="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                  <span class="text-green-400 font-medium">{{ t('projects.modal.online') }}</span>
                </span>
              </div>
            </div>

            <a 
              v-if="project.live_url"
              :href="project.live_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08] hover:border-yellow-500/30 hover:bg-yellow-500/[0.06] rounded-lg transition-all duration-300 group/link"
            >
              <Icon name="ph:globe" class="w-4 h-4 text-yellow-500" />
              <span class="text-[13px] text-gray-300 group-hover/link:text-white transition-colors font-medium">{{ project.live_url.replace('https://', '') }}</span>
              <Icon name="ph:arrow-up-right-bold" class="w-3 h-3 text-gray-500 group-hover/link:text-yellow-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        <!-- ===== CONTENT ===== -->
        <div class="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20 space-y-16 md:space-y-20">
          
          <!-- Overview -->
          <div>
            <p class="text-lg md:text-xl text-gray-300 leading-[1.7] font-light">
              {{ project.description }}
            </p>
          </div>

          <!-- THE CHALLENGE -->
          <div>
            <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-5 flex items-center gap-3">
              {{ t('projects.modal.challenge') }}
              <span class="h-[1px] flex-1 bg-white/[0.06]"></span>
            </h3>
            <p class="text-[15px] md:text-base text-gray-400 leading-[1.8] font-light">
              {{ project.challenge_text }}
            </p>
          </div>

          <!-- KEY FEATURES -->
          <div v-if="project.features && project.features.length">
            <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-6 flex items-center gap-3">
              {{ t('projects.modal.features') }}
              <span class="h-[1px] flex-1 bg-white/[0.06]"></span>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="(feature, i) in project.features" 
                :key="i"
                class="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors group"
              >
                <div class="mt-0.5 w-6 h-6 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <span class="text-yellow-500 text-[11px] font-mono font-bold">{{ String(i + 1).padStart(2, '0') }}</span>
                </div>
                <span class="text-[13px] md:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- THE SOLUTION + Screenshot -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-5 flex items-center gap-3">
                {{ t('projects.modal.development') }}
                <span class="h-[1px] flex-1 bg-white/[0.06]"></span>
              </h3>
              <p class="text-[15px] md:text-base text-gray-400 leading-[1.8] font-light">
                {{ project.development_text }}
              </p>
            </div>

            <div class="relative group cursor-zoom-in" @click="openZoom(project.second_image || project.image)">
              <div class="rounded-xl overflow-hidden border border-white/[0.06] shadow-xl">
                <NuxtImg 
                  :src="project.second_image || project.image" 
                  class="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-xl">
                  <Icon name="ph:arrows-out-simple-bold" class="text-white text-xl drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div class="lg:col-span-5">
              <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-5 flex items-center gap-3">
                {{ t('projects.modal.stack') }}
                <span class="h-[1px] flex-1 bg-white/[0.06]"></span>
              </h3>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="tag in project.tags"
                  :key="tag"
                  class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors group/tech"
                >
                  <Icon 
                    :name="getTagIcon(tag)" 
                    class="w-4 h-4 shrink-0 text-gray-300 opacity-70 group-hover/tech:opacity-100 transition-opacity" 
                  />
                  <span class="text-[12px] font-mono text-gray-400 group-hover/tech:text-gray-300 transition-colors truncate">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Highlights -->
            <div class="lg:col-span-7" v-if="project.highlights && project.highlights.length">
              <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-5 flex items-center gap-3">
                {{ t('projects.modal.highlights') }}
                <span class="h-[1px] flex-1 bg-white/[0.06]"></span>
              </h3>
              <div class="space-y-3">
                <div 
                  v-for="(highlight, i) in project.highlights" 
                  :key="i"
                  class="flex items-start gap-3"
                >
                  <Icon name="ph:check-circle" class="text-yellow-500/60 w-4 h-4 mt-0.5 shrink-0" />
                  <span class="text-[13px] md:text-sm text-gray-400 leading-relaxed">{{ highlight }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- THE RESULT -->
          <div class="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 md:p-10">
            <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-5">
              {{ t('projects.modal.result') }}
            </h3>
            <p class="text-base md:text-lg text-gray-200 leading-[1.8] font-light">
              {{ project.result_text }}
            </p>

            <a 
              v-if="project.live_url"
              :href="project.live_url" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2.5 mt-6 px-5 py-2.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-full text-sm font-medium transition-all duration-300 group/cta"
            >
              <span>{{ t('projects.visit_site') }}</span>
              <Icon name="ph:arrow-up-right-bold" class="w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </div>
  </Transition>

  <!-- Zoom -->
  <Transition name="fade">
    <div v-if="zoomedImage" class="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out" @click="closeZoom">
      <button class="absolute top-6 right-6 z-[1001] bg-white/10 hover:bg-white text-white hover:text-black rounded-full w-11 h-11 flex items-center justify-center transition-all duration-300">
        <Icon name="ph:x-bold" class="text-lg" />
      </button>
      <div v-if="isZoomLoading" class="absolute inset-0 flex items-center justify-center z-[-1]">
        <div class="w-10 h-10 border-2 border-white/10 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>
      <img :src="zoomedImage" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500" :class="{ 'opacity-0 scale-95': isZoomLoading, 'opacity-100 scale-100': !isZoomLoading }" alt="Zoomed View" @click.stop @load="onZoomImageLoad" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, nextTick } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import type { Project } from '@/types/project'

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<{
  isOpen: boolean
  project: Project
  nextProject?: Project | null
  prevProject?: Project | null
}>()

const emit = defineEmits(['close', 'navigate'])
const modalRef = ref<HTMLElement | null>(null)
const zoomedImage = ref<string | null>(null)
const isZoomLoading = ref(false)

const { activate, deactivate } = useFocusTrap(modalRef, {
  immediate: false, escapeDeactivates: false, allowOutsideClick: true, fallbackFocus: '#modal-content'
})

onKeyStroke('Escape', () => { if (props.isOpen) emit('close') })
onKeyStroke('ArrowLeft', () => {
  if (props.isOpen && props.prevProject) emit('navigate', props.prevProject)
})
onKeyStroke('ArrowRight', () => {
  if (props.isOpen && props.nextProject) emit('navigate', props.nextProject)
})

// Tech icon mapping — uses simple-icons (monochrome, inherits text color) for dark logos
const techIconMap: Record<string, string> = {
  'Laravel': 'logos:laravel',
  'Vue.js': 'logos:vue',
  'Nuxt 3': 'logos:nuxt-icon',
  'Docker': 'logos:docker-icon',
  'Nginx': 'simple-icons:nginx',
  'Django': 'simple-icons:django',
  'MQTT': 'ph:wifi-high-bold',
  'CI/CD': 'ph:git-branch-bold',
  'Chart.js': 'simple-icons:chartdotjs',
  'Leaflet': 'simple-icons:leaflet',
  'Sanity.io': 'simple-icons:sanity',
  'Asaas': 'ph:credit-card-bold',
  'JWT': 'ph:key-bold',
  'AWS S3': 'simple-icons:amazonaws',
  'AWS': 'simple-icons:amazonaws',
  'Pinia': 'logos:pinia',
  'Vuetify': 'logos:vuetifyjs',
  'MySQL': 'simple-icons:mysql',
  'PostgreSQL': 'logos:postgresql',
  'WebSocket': 'ph:plugs-connected-bold',
  'TypeScript': 'logos:typescript-icon',
  'Tailwind CSS': 'logos:tailwindcss-icon',
}

const getTagIcon = (tag: string): string => {
  return techIconMap[tag] || 'ph:code-bold'
}

const openZoom = (src: string) => { if (src) { zoomedImage.value = src; isZoomLoading.value = true } }
const onZoomImageLoad = () => { isZoomLoading.value = false }
const closeZoom = () => { zoomedImage.value = null; isZoomLoading.value = false }

watch(() => props.project, async () => { 
  await nextTick()
  document.getElementById('modal-content')?.scrollTo({ top: 0, behavior: 'instant' }) 
})
watch(() => props.isOpen, (v) => { document.body.style.overflow = v ? 'hidden' : '' }, { immediate: true })
watch(() => props.isOpen, async (v) => { if (v) { await nextTick(); if (modalRef.value) activate() } else deactivate() })

onUnmounted(() => { document.body.style.overflow = ''; deactivate() })
const close = () => emit('close')
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.4s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.slide-in { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; transform: translateX(100%); }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>