<template>
  <header 
    class="fixed top-6 left-0 right-0 z-50 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out px-4 pointer-events-none"
    :class="isVisible ? 'translate-y-0' : '-translate-y-[200%]'"
  >
    <nav class="relative pointer-events-auto flex items-center gap-1 p-2 pr-2 bg-[#1a1a1c]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl z-50">
      
      <button @click="scrollToSection('#home')" class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all duration-300 group shrink-0">
        <span class="font-display font-bold text-sm group-hover:hidden">BF</span>
        <Icon name="ph:arrow-up" class="hidden group-hover:block" />
      </button>

      <div class="w-[1px] h-4 bg-white/20 mx-2 hidden md:block"></div>

      <ul class="hidden md:flex items-center gap-6 mr-4">
        <li v-for="link in links" :key="link.name">
          <a 
            :href="link.href" 
            @click.prevent="scrollToSection(link.href)"
            class="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <Icon :name="link.icon" class="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-yellow-500" />
            <span>{{ link.name }}</span>
          </a>
        </li>
      </ul>

      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
      >
        <Icon :name="isMobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="w-6 h-6" />
      </button>

      <div class="w-[1px] h-4 bg-white/20 mx-2"></div>
      
      <div class="relative" ref="langMenuRef">
        <button 
          @click="isLangMenuOpen = !isLangMenuOpen"
          class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group"
        >
          <Icon :name="currentLocaleObj.flag" class="w-5 h-5 rounded-full shadow-sm" />
          <span class="text-xs font-mono font-bold tracking-wider text-gray-300 group-hover:text-white">
            {{ currentLocaleObj.label }}
          </span>
          <Icon 
            name="ph:caret-down-bold" 
            class="w-3 h-3 text-gray-500 transition-transform duration-300"
            :class="{ 'rotate-180': isLangMenuOpen }"
          />
        </button>

        <Transition name="dropdown">
          <div 
            v-if="isLangMenuOpen"
            class="absolute top-full right-0 mt-3 w-40 bg-[#1a1a1c] border border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl flex flex-col p-1 z-50"
          >
            <button
              v-for="l in availableLocales"
              :key="l.code"
              @click="switchLanguage(l.code)"
              class="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-sm group hover:bg-white/10"
              :class="{ 'bg-white/5': locale === l.code }"
            >
              <Icon :name="l.flag" class="w-5 h-5 opacity-80 group-hover:opacity-100" />
              <div class="flex flex-col items-start leading-none">
                <span class="text-gray-200 font-medium group-hover:text-white">{{ l.name }}</span>
                <span class="text-[10px] text-gray-500 uppercase font-mono mt-1">{{ l.label }}</span>
              </div>
              <Icon v-if="locale === l.code" name="ph:check-bold" class="ml-auto w-3 h-3 text-yellow-500" />
            </button>
          </div>
        </Transition>
      </div>
    </nav>

    <Transition name="dropdown">
      <div 
        v-if="isMobileMenuOpen"
        ref="mobileMenuRef"
        class="pointer-events-auto md:hidden absolute top-[calc(100%+0.75rem)] w-auto min-w-[200px] bg-[#1a1a1c]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 z-40"
      >
        <a 
          v-for="link in links" 
          :key="link.name"
          :href="link.href" 
          @click.prevent="scrollToSection(link.href)"
          class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
        >
          <Icon :name="link.icon" class="w-5 h-5 text-yellow-500" />
          <span class="text-sm font-medium">{{ link.name }}</span>
        </a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useWindowScroll, onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { locale, setLocale, t } = useI18n({
  useScope: 'global'
})
const { y } = useWindowScroll()

const lastScrollY = ref(0)
const isVisible = ref(true)

watch(y, (newY) => {
  if (Math.abs(newY - lastScrollY.value) > 10) {
    isMobileMenuOpen.value = false
  }

  if (newY <= 50) {
    isVisible.value = true
  } else if (newY > lastScrollY.value) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }
  lastScrollY.value = newY
})

const isLangMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)

const langMenuRef = ref(null)
const mobileMenuRef = ref(null)

onClickOutside(langMenuRef, () => isLangMenuOpen.value = false)
onClickOutside(mobileMenuRef, (event) => {
  isMobileMenuOpen.value = false
})

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
  setTimeout(() => {
    window.scrollTo({ top: currentScroll, behavior: 'instant' })
  }, 50)
}

const links = computed(() => [
  { name: t('nav.intro'), href: '#home', icon: 'ph:sparkle' },
  { name: t('nav.cases'), href: '#projects', icon: 'ph:grid-four' },
  { name: t('nav.contact'), href: '#contact', icon: 'ph:paper-plane-tilt' }
])

const scrollToSection = (href: string) => {
  isMobileMenuOpen.value = false
  const element = document.querySelector(href)
  if (element) element.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>