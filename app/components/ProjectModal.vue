<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[999] flex justify-end" ref="modalRef">
      <div class="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity" @click="close"></div>
      
      <!-- Nav arrows -->
      <div class="fixed top-1/2 -translate-y-1/2 left-4 z-[1002] hidden xl:block" v-if="prevProject">
        <button @click="$emit('navigate', prevProject)" class="bg-white/5 hover:bg-yellow-500 hover:text-black text-white p-3.5 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group">
          <Icon name="ph:caret-left-bold" class="text-xl" />
          <span class="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-[#111] px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 text-white pointer-events-none">{{ prevProject.title }}</span>
        </button>
      </div>
      <div class="fixed top-1/2 -translate-y-1/2 right-4 lg:right-[calc(80vw+1rem)] 2xl:right-[calc(1280px+1rem)] z-[1002] hidden xl:block" v-if="nextProject">
        <button @click="$emit('navigate', nextProject)" class="bg-white/5 hover:bg-yellow-500 hover:text-black text-white p-3.5 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group">
          <Icon name="ph:caret-right-bold" class="text-xl" />
          <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#111] px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 text-white pointer-events-none">{{ nextProject.title }}</span>
        </button>
      </div>

      <!-- Modal body -->
      <div id="modal-content" tabindex="-1" class="relative w-full md:w-[90vw] lg:w-[80vw] 2xl:max-w-7xl h-full bg-[#0c0c0e] overflow-y-auto shadow-2xl border-l border-white/[0.06] slide-in">
        
        <!-- Mobile nav -->
        <div class="absolute top-6 left-6 flex gap-3 md:hidden z-50">
          <button v-if="prevProject" @click="$emit('navigate', prevProject)" class="bg-black/40 hover:bg-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10 transition-colors backdrop-blur-sm">
            <Icon name="ph:caret-left-bold" />
          </button>
          <button v-if="nextProject" @click="$emit('navigate', nextProject)" class="bg-black/40 hover:bg-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10 transition-colors backdrop-blur-sm">
            <Icon name="ph:caret-right-bold" />
          </button>
        </div>

        <!-- Close -->
        <button @click="close" class="fixed top-6 right-6 md:top-8 md:right-8 z-50 bg-black/40 hover:bg-white border border-white/10 hover:text-black text-white backdrop-blur-md w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group">
          <Icon name="ph:x-bold" class="text-base group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <!-- ===== COVER ===== -->
        <div class="h-[35vh] md:h-[50vh] relative w-full group cursor-zoom-in" @click="openZoom(project.image)">
          <NuxtImg :src="project.image" class="w-full h-full object-cover" />
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

        <!-- ===== INFO BAR ===== -->
        <div class="border-b border-white/[0.06] bg-[#0c0c0e]">
          <div class="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-mono tracking-[0.15em] uppercase">
            <div class="flex items-center gap-2">
              <span class="text-gray-400">{{ t('projects.modal.year') }}</span>
              <span class="text-white">{{ project.year }}</span>
            </div>
            <span class="w-[1px] h-4 bg-white/[0.06] hidden sm:block"></span>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">{{ t('projects.modal.company') }}</span>
              <span class="text-white">{{ project.company }}</span>
            </div>
            <span class="w-[1px] h-4 bg-white/[0.06] hidden sm:block"></span>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">{{ t('projects.modal.role_label') }}</span>
              <span class="text-white">{{ project.role }}</span>
            </div>
            <span class="w-[1px] h-4 bg-white/[0.06] hidden sm:block"></span>
            <div class="flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <span class="text-green-500">{{ t('projects.modal.online') }}</span>
            </div>
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
                />
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-xl">
                  <Icon name="ph:arrows-out-simple-bold" class="text-white text-xl drop-shadow-md" />
                </div>
              </div>
            </div>
          </div>

          <!-- TECH STACK + HIGHLIGHTS -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <!-- Stack -->
            <div class="lg:col-span-4">
              <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-5">
                {{ t('projects.modal.stack') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in project.tags" 
                  :key="tag"
                  class="text-[12px] font-mono text-gray-400 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-lg"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Highlights -->
            <div class="lg:col-span-8" v-if="project.highlights && project.highlights.length">
              <h3 class="text-xs font-mono uppercase text-yellow-500/70 tracking-[0.25em] mb-5">
                {{ t('projects.modal.highlights') }}
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

const openZoom = (src: string) => { if (src) { zoomedImage.value = src; isZoomLoading.value = true } }
const onZoomImageLoad = () => { isZoomLoading.value = false }
const closeZoom = () => { zoomedImage.value = null; isZoomLoading.value = false }

watch(() => props.project, () => { document.getElementById('modal-content')?.scrollTo(0, 0) })
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