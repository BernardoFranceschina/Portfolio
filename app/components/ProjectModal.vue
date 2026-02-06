<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[999] flex justify-end" ref="modalRef">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" @click="close"></div>
      
      <div class="fixed top-1/2 -translate-y-1/2 left-4 z-[1002] hidden xl:block" v-if="prevProject">
        <button 
          @click="$emit('navigate', prevProject)"
          class="bg-black/50 hover:bg-yellow-500 hover:text-black text-white p-4 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group"
        >
          <Icon name="ph:caret-left-bold" class="text-2xl" />
          <span class="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black px-3 py-1 rounded text-xs font-mono uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 text-white pointer-events-none">
            {{ t(`projects.items.${prevProject.id}.title`) }}
          </span>
        </button>
      </div>

      <div class="fixed top-1/2 -translate-y-1/2 right-4 lg:right-[calc(80vw+1rem)] 2xl:right-[calc(1280px+1rem)] z-[1002] hidden xl:block" v-if="nextProject">
        <button 
          @click="$emit('navigate', nextProject)"
          class="bg-black/50 hover:bg-yellow-500 hover:text-black text-white p-4 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 group"
        >
          <Icon name="ph:caret-right-bold" class="text-2xl" />
          <span class="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black px-3 py-1 rounded text-xs font-mono uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 text-white pointer-events-none">
            {{ t(`projects.items.${nextProject.id}.title`) }}
          </span>
        </button>
      </div>
      <div id="modal-content" tabindex="-1" class="relative w-full md:w-[90vw] lg:w-[80vw] 2xl:max-w-7xl h-full bg-[#111] overflow-y-auto shadow-2xl border-l border-white/10 slide-in flex flex-col">
        
        <div class="absolute top-6 left-6 flex gap-4 md:hidden z-50">
          <button 
            v-if="prevProject"
            @click="$emit('navigate', prevProject)"
            class="bg-black/20 hover:bg-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10 transition-colors"
          >
            <Icon name="ph:caret-left-bold" />
          </button>
          <button 
            v-if="nextProject"
            @click="$emit('navigate', nextProject)"
            class="bg-black/20 hover:bg-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center border border-white/10 transition-colors"
          >
            <Icon name="ph:caret-right-bold" />
          </button>
        </div>

        <button 
          @click="close" 
          class="fixed top-6 right-6 md:top-8 md:right-8 z-50 bg-black/20 hover:bg-white border border-white/10 hover:text-black text-white backdrop-blur-md w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group"
        >
          <Icon name="ph:x-bold" class="text-lg md:text-xl group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div class="flex-1 pb-12">
          <div class="h-[45vh] md:h-[60vh] relative w-full group cursor-zoom-in" @click="openZoom(project.image)">
            <NuxtImg :src="project.image" class="w-full h-full object-cover transition-transform duration-700" />
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <div class="bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10">
                <Icon name="ph:magnifying-glass-plus-bold" class="text-white text-2xl" />
              </div>
            </div>

            <div class="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent flex items-end p-6 md:p-16 lg:p-24 pointer-events-none">
              <h1 class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1] max-w-5xl shadow-black drop-shadow-lg">
                {{ t(`projects.items.${project.id}.title`) }}
              </h1>
            </div>
          </div>

          <div class="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20 text-gray-300 space-y-16 md:space-y-24">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div class="lg:col-span-8">
                <h3 class="text-xl md:text-2xl text-white font-display mb-4 flex items-center gap-3">
                  <span class="w-8 h-[1px] bg-yellow-500"></span>
                  {{ t('projects.modal.challenge') }}
                </h3>
                <p class="leading-relaxed text-base md:text-lg text-gray-300 font-light">
                  {{ t(`projects.items.${project.id}.challenge_text`) }}
                </p>
              </div>

              <div class="lg:col-span-4 lg:pl-8 lg:border-l border-white/10">
                <h3 class="text-xs font-mono uppercase text-gray-500 tracking-widest mb-6 flex items-center gap-3">
                  {{ t('projects.modal.stack') }}
                  <span class="h-[1px] flex-1 bg-white/10"></span>
                </h3>
                <div class="flex flex-col gap-3">
                  <div v-for="tag in project.tags" :key="tag" class="flex items-center gap-3 text-gray-300 group">
                    <Icon name="ph:caret-right-bold" class="text-yellow-500 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    <span class="font-mono text-sm group-hover:text-white transition-colors">{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div 
                class="lg:col-span-7 order-2 lg:order-1 relative group cursor-zoom-in"
                @click="openZoom(project.second_image || project.image)"
              >
                <div class="absolute inset-0 bg-yellow-500/10 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div class="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl transform lg:-rotate-1 lg:group-hover:rotate-0 transition-all duration-700">
                  <NuxtImg 
                    :src="project.second_image || project.image" 
                    class="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                  />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                     <Icon name="ph:arrows-out-simple-bold" class="text-white text-3xl drop-shadow-md" />
                  </div>
                </div>
              </div>

              <div class="lg:col-span-5 order-1 lg:order-2">
                <h3 class="text-xl md:text-2xl text-white font-display mb-4 flex items-center gap-3">
                  <span class="w-8 h-[1px] bg-yellow-500"></span>
                  {{ t('projects.modal.development') }}
                </h3>
                <p class="leading-relaxed text-base md:text-lg text-gray-300 font-light">
                  {{ t(`projects.items.${project.id}.development_text`, t(`projects.items.${project.id}.description`)) }}
                </p>
              </div>
            </div>

            <div>
               <h3 class="text-xs font-mono uppercase text-gray-500 tracking-widest mb-6">
                 {{ t('projects.modal.architecture') }}
               </h3>
               <div 
                 v-if="project.architecture_image" 
                 class="w-full bg-[#151515] rounded-xl overflow-hidden border border-white/10 group hover:border-white/30 transition-colors cursor-zoom-in relative"
                 @click="openZoom(project.architecture_image)"
               >
                  <NuxtImg 
                    :src="project.architecture_image" 
                    class="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    alt="System Architecture Diagram"
                  />
                  <div class="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="ph:magnifying-glass-plus" class="text-yellow-500" />
                    <span class="text-xs text-white">Expandir</span>
                  </div>
               </div>

               <div v-else class="w-full aspect-video md:aspect-[21/9] bg-[#151515] rounded-xl overflow-hidden border border-white/10 flex items-center justify-center relative group">
                <div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px); background-size: 40px 40px;"></div>
                <div class="relative z-10 text-center">
                  <div class="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 mb-4 group-hover:scale-110 group-hover:border-yellow-500/50 transition-all duration-500">
                    <Icon name="ph:tree-structure" class="text-4xl text-gray-400 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <span class="font-mono text-xs text-gray-500 uppercase tracking-widest group-hover:text-white transition-colors">
                    {{ t('projects.modal.view_diagram') }}
                  </span>
                </div>
              </div>
            </div>

            <div class="border-l-2 md:border-l-4 border-yellow-500/50 pl-6 md:pl-10 py-2">
              <h3 class="text-xl md:text-2xl text-white font-display mb-4">
                {{ t('projects.modal.result') }}
              </h3>
              <p class="text-lg md:text-2xl font-light leading-relaxed text-white italic font-serif">
                "{{ t(`projects.items.${project.id}.result_text`) }}"
              </p>
            </div>
          </div>
        </div>

        <div class="border-t border-white/10 bg-[#0f0f11] p-6 md:p-8">
          <div class="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500">
            <div class="flex items-center gap-6">
              <div class="flex flex-col">
                <span class="text-gray-700 mb-1">{{ t('projects.modal.year') }}</span>
                <span class="text-white">{{ project.year }}</span>
              </div>
              <div class="w-[1px] h-8 bg-white/10"></div>
              <div class="flex flex-col">
                <span class="text-gray-700 mb-1">{{ t('projects.modal.company') }}</span>
                <span class="text-white">{{ project.company || '-' }}</span>
              </div>
              <div class="w-[1px] h-8 bg-white/10 hidden md:block"></div>
              <div class="flex flex-col hidden md:flex">
                <span class="text-gray-700 mb-1">{{ t('projects.modal.status') }}</span>
                <span class="text-green-500">{{ t('projects.modal.online') }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 text-white/40">
              <span>Bernardo Franceschina</span>
              <Icon name="ph:copyright" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </Transition>

  <Transition name="fade">
    <div 
      v-if="zoomedImage" 
      class="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
      @click="closeZoom"
    >
      <button 
        class="absolute top-6 right-6 z-[1001] bg-white/10 hover:bg-white text-white hover:text-black rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300"
      >
        <Icon name="ph:x-bold" class="text-xl" />
      </button>

      <div v-if="isZoomLoading" class="absolute inset-0 flex items-center justify-center z-[-1]">
        <div class="w-12 h-12 border-2 border-white/10 border-t-yellow-500 rounded-full animate-spin"></div>
      </div>

      <img 
        :src="zoomedImage" 
        class="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-500" 
        :class="{ 'opacity-0 scale-95': isZoomLoading, 'opacity-100 scale-100': !isZoomLoading }"
        alt="Zoomed View"
        @click.stop
        @load="onZoomImageLoad"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, nextTick } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import type { Project } from '@/types/project'

const { t } = useI18n({
  useScope: 'global'
})

const props = defineProps<{
  isOpen: boolean
  project: Project
  nextProject?: Project | null
  prevProject?: Project| null
}>()

const emit = defineEmits(['close', 'navigate'])
const modalRef = ref<HTMLElement | null>(null)
const zoomedImage = ref<string | null>(null)
const isZoomLoading = ref(false)

const { activate, deactivate } = useFocusTrap(modalRef, {
  immediate: false,
  escapeDeactivates: false,
  allowOutsideClick: true,
  fallbackFocus: '#modal-content'
})

onKeyStroke('Escape', (e) => {
  if (props.isOpen) emit('close')
})

const openZoom = (src: string) => {
  if (src) {
    zoomedImage.value = src
    isZoomLoading.value = true
  }
}

const onZoomImageLoad = () => {
  isZoomLoading.value = false
}

const closeZoom = () => {
  zoomedImage.value = null
  isZoomLoading.value = false
}

watch(() => props.project, () => {
  const modalContent = document.getElementById('modal-content')
  if (modalContent) modalContent.scrollTop = 0
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, { immediate: true })

// Watcher principal para ativar o Focus Trap
watch(() => props.isOpen, async (val) => {
  if (val) {
    await nextTick() // Aguarda o v-if renderizar o elemento no DOM
    if (modalRef.value) {
      activate()
    }
  } else {
    deactivate()
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  deactivate()
})

const close = () => {
  emit('close')
}
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.slide-in {
  animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform: translateX(100%);
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>