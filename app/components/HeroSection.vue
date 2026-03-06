<template>
  <section class="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0a0a0c] text-white selection:bg-yellow-400/30 selection:text-yellow-200">
    
    <!-- Atmospheric background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-yellow-500/[0.03] rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[100px]"></div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 100% 80px;"></div>
    </div>

    <div class="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-24 lg:py-0">
        
        <!-- Text content -->
        <div class="w-full lg:w-3/5 order-1">
          
          <div 
            class="flex items-center gap-4 mb-8 hero-text"
            :class="{ 'hero-visible': isLoaded }"
            :style="{ '--delay': '0.2s' }"
          >
            <span class="block w-12 h-[1px] bg-yellow-500/60"></span>
            <span class="font-mono text-[11px] text-yellow-500/80 tracking-[0.35em] uppercase">
              {{ t('hero.tagline') }}
            </span>
          </div>

          <h1 
            class="mb-8 hero-text"
            :class="{ 'hero-visible': isLoaded }"
            :style="{ '--delay': '0.4s' }"
          >
            <i18n-t keypath="hero.title" tag="span" scope="global" class="block text-[clamp(2.5rem,6vw,5.5rem)] font-display font-light leading-[1.05] tracking-[-0.02em]">
              <template #highlight>
                <span class="relative inline-block">
                  <span class="absolute -inset-x-2 inset-y-0 bg-yellow-400/90 -rotate-1 skew-x-2 rounded-[3px] origin-left" :class="isLoaded ? 'animate-highlight' : 'scale-x-0'"></span>
                  <span class="relative text-black font-serif italic font-bold px-2">
                    {{ t('hero.title_highlight') }}
                  </span>
                </span>
              </template>
            </i18n-t>
          </h1>

          <p 
            class="text-[15px] md:text-lg text-gray-400 max-w-xl leading-[1.7] font-light mb-10 hero-text"
            :class="{ 'hero-visible': isLoaded }"
            :style="{ '--delay': '0.6s' }"
          >
            {{ t('hero.subtitle') }}
          </p>

          <div 
            class="flex items-center gap-8 hero-text"
            :class="{ 'hero-visible': isLoaded }"
            :style="{ '--delay': '0.8s' }"
          >
            <button 
              class="group relative px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm tracking-wide hover:bg-yellow-400 transition-all duration-300 flex items-center gap-3 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
              @click.prevent="scrollToSection('#projects')"
            >
              <span>{{ t('hero.cta') }}</span>
              <Icon name="ph:arrow-down" class="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a 
              href="#about" 
              @click.prevent="scrollToSection('#about')"
              class="hidden md:flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors font-mono tracking-wide group"
            >
              <span class="w-10 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-yellow-500/40 transition-all duration-500"></span>
              {{ t('nav.about') }}
            </a>
          </div>
        </div>

        <!-- Photo -->
        <div 
          class="w-full lg:w-2/5 order-2 flex justify-center hero-text"
          :class="{ 'hero-visible': isLoaded }"
          :style="{ '--delay': '0.3s' }"
        >
          <div class="relative w-[260px] sm:w-[300px] md:w-[360px]">
            
            <!-- Simple clean frame -->
            <div class="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50 group">
              <NuxtImg 
                src="/bernardo.png" 
                alt="Bernardo Franceschina — Full Stack Developer" 
                class="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-700"
                fetchpriority="high"
                format="webp"
                preload
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            <!-- Code badge — prominent -->
            <div class="absolute -top-5 -right-5 md:-top-6 md:-right-6 z-30">
              <div class="bg-yellow-400 text-black p-3 md:p-4 rounded-2xl shadow-xl shadow-yellow-500/20 rotate-[6deg] hover:rotate-0 transition-transform duration-300">
                <Icon name="ph:code-bold" class="w-6 h-6 md:w-7 md:h-7" />
              </div>
            </div>

            <!-- Name badge at bottom -->
            <div class="absolute -bottom-4 left-4 right-4 z-30">
              <div class="bg-[#111113] border border-white/10 px-4 py-2.5 rounded-xl shadow-xl flex items-center justify-between">
                <span class="font-mono text-[11px] text-white tracking-wide">Bernardo Franceschina</span>
                <span class="font-mono text-[10px] text-yellow-500 tracking-wider">UFSC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div 
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hero-text"
      :class="{ 'hero-visible': isLoaded }"
      :style="{ '--delay': '1.2s' }"
    >
      <span class="font-mono text-[10px] text-gray-400 tracking-[0.3em] uppercase">{{ t('hero.scroll_hint') }}</span>
      <div class="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent animate-pulse"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const isLoaded = ref(false)

onMounted(() => {
  requestAnimationFrame(() => { isLoaded.value = true })
})

const scrollToSection = (href: string) => {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.font-display { font-family: 'Fraunces', serif; }

.hero-text {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0s);
}

.hero-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes highlight-grow {
  0% { transform: scaleX(0) skewX(-2deg) rotate(-1deg); }
  100% { transform: scaleX(1) skewX(-2deg) rotate(-1deg); }
}

.animate-highlight {
  animation: highlight-grow 0.7s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.9s;
  transform: scaleX(0);
  transform-origin: left;
}
</style>