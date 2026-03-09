<template>
  <header 
    class="fixed top-5 left-0 right-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] px-4 pointer-events-none"
    :class="isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0'"
  >
    <nav class="relative pointer-events-auto flex items-center gap-1 p-1.5 pr-2 bg-[#111113]/90 backdrop-blur-2xl border border-white/[0.06] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50">
      
      <!-- Logo -->
      <button @click="scrollToSection('#home')" class="w-9 h-9 flex items-center justify-center bg-white/[0.06] hover:bg-white text-white hover:text-black rounded-full transition-all duration-300 group shrink-0">
        <span class="font-display font-bold text-sm group-hover:hidden">BF</span>
        <Icon name="ph:arrow-up" class="hidden group-hover:block w-4 h-4" />
      </button>

      <div class="w-[1px] h-3.5 bg-white/10 mx-1.5 hidden md:block"></div>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-5 mr-3">
        <li v-for="link in links" :key="link.name">
          <a 
            :href="link.href" 
            @click.prevent="scrollToSection(link.href)"
            class="group flex items-center gap-1.5 text-[13px] font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Icon :name="link.icon" class="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-yellow-500" />
            <span>{{ link.name }}</span>
          </a>
        </li>
      </ul>

      <!-- Mobile menu button -->
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle navigation menu"
        class="md:hidden w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Icon :name="isMobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="w-5 h-5" />
      </button>

      <div class="w-[1px] h-3.5 bg-white/10 mx-1.5"></div>
      
      <!-- Language switcher -->
      <div class="relative" ref="langMenuRef">
        <button 
          @click="isLangMenuOpen = !isLangMenuOpen"
          class="flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 rounded-full bg-black/30 border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.04] transition-all group"
        >
          <Icon :name="currentLocaleObj.flag" class="w-4 h-4 rounded-full" />
          <span class="text-[11px] font-mono font-bold tracking-wider text-gray-400 group-hover:text-white">
            {{ currentLocaleObj.label }}
          </span>
          <Icon 
            name="ph:caret-down-bold" 
            class="w-2.5 h-2.5 text-gray-400 transition-transform duration-300"
            :class="{ 'rotate-180': isLangMenuOpen }"
          />
        </button>

        <Transition name="dropdown">
          <div 
            v-if="isLangMenuOpen"
            class="absolute top-full right-0 mt-2.5 w-36 bg-[#141416] border border-white/[0.06] rounded-xl shadow-xl overflow-hidden backdrop-blur-xl flex flex-col p-1 z-50"
          >
            <button
              v-for="l in availableLocales"
              :key="l.code"
              @click="switchLanguage(l.code)"
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-sm group hover:bg-white/[0.06]"
              :class="{ 'bg-white/[0.03]': locale === l.code }"
            >
              <Icon :name="l.flag" class="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <div class="flex flex-col items-start leading-none">
                <span class="text-gray-300 text-[13px] group-hover:text-white">{{ l.name }}</span>
                <span class="text-[9px] text-gray-400 uppercase font-mono mt-0.5">{{ l.label }}</span>
              </div>
              <Icon v-if="locale === l.code" name="ph:check-bold" class="ml-auto w-3 h-3 text-yellow-500" />
            </button>
          </div>
        </Transition>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition name="dropdown">
      <div 
        v-if="isMobileMenuOpen"
        ref="mobileMenuRef"
        class="pointer-events-auto md:hidden absolute top-[calc(100%+0.5rem)] w-auto min-w-[180px] bg-[#141416]/95 backdrop-blur-2xl border border-white/[0.06] rounded-xl shadow-2xl p-1.5 flex flex-col gap-0.5 z-40"
      >
        <a 
          v-for="link in links" 
          :key="link.name"
          :href="link.href" 
          @click.prevent="scrollToSection(link.href)"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-white/[0.06] text-gray-400 hover:text-white transition-all cursor-pointer"
        >
          <Icon :name="link.icon" class="w-4 h-4 text-yellow-500/80" />
          <span class="text-[13px] font-medium">{{ link.name }}</span>
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWindowScroll, onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { locale, setLocale, t } = useI18n({ useScope: 'global' })
const { y } = useWindowScroll()

const lastScrollY = ref(0)
const isVisible = ref(true)

watch(y, (newY) => {
  const delta = newY - lastScrollY.value
  if (Math.abs(delta) < 5) return
  
  isMobileMenuOpen.value = false
  isVisible.value = newY <= 50 || delta < 0
  lastScrollY.value = newY
})

const isLangMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)
const langMenuRef = ref(null)
const mobileMenuRef = ref(null)

onClickOutside(langMenuRef, () => isLangMenuOpen.value = false)
onClickOutside(mobileMenuRef, () => isMobileMenuOpen.value = false)

const availableLocales = [
  { code: 'pt', label: 'PT', name: 'Português', flag: 'circle-flags:br' },
  { code: 'en', label: 'EN', name: 'English', flag: 'circle-flags:us' }
]

const currentLocaleObj = computed(() => 
  availableLocales.find(l => l.code === locale.value) || availableLocales[0]
)

const switchLanguage = async (code: any) => {
  const currentScroll = window.scrollY
  isLangMenuOpen.value = false
  await setLocale(code)
  await nextTick()
  await nextTick() // segundo tick garante que o DOM re-renderizou
  window.scrollTo({ top: currentScroll, behavior: 'instant' })
}

const links = computed(() => [
  { name: t('nav.intro'), href: '#home', icon: 'ph:sparkle' },
  { name: t('nav.about'), href: '#about', icon: 'ph:user' },
  { name: t('nav.cases'), href: '#projects', icon: 'ph:grid-four' },
  { name: t('nav.contact'), href: '#contact', icon: 'ph:paper-plane-tilt' }
])

const scrollToSection = (href: string) => {
  isMobileMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }

.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}
</style>