<template>
  <section class="relative min-h-[100dvh] flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-[#0f0f11] text-white selection:bg-yellow-400/30 selection:text-yellow-200 py-12 lg:py-0">
    
    <div class="w-full lg:w-1/2 relative flex items-center justify-center z-10 order-2 lg:order-1 mt-12 lg:mt-0">
      <div class="relative w-[280px] sm:w-[350px] md:w-[450px] aspect-square">
        <div class="absolute -top-10 -left-10 w-32 h-32 z-10 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full blur-xl opacity-60 animate-pulse-slow"></div>
        
        <div class="absolute inset-0 z-20 transform hover:scale-105 transition-transform duration-700 ease-out">
          <div class="w-full h-full bg-white rounded-[2rem] md:rounded-[3rem] rotate-[-3deg] overflow-hidden border-4 border-white/10 shadow-2xl relative">
            <img 
              src="/bernardo.png" 
              alt="Colagem com diversas linguagens de programações e frameworks, junto com a logo da universidade federal de santa catarina e ao centro a foto do Bernardo Franceschina" 
              class="object-cover w-full h-full  hover:grayscale-0 transition-all duration-500"
              fetchpriority="high"
              width="500" 
              height="500"
              decoding="sync"
            />
            <div class="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
           </div>
        </div>

        <div class="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-4 z-30 animate-float">
          <div class="bg-[#00DC82] text-black font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
            <Icon name="material-symbols:android-contacts" class="w-5 h-5 md:w-6 md:h-6" />
            <span class="text-xs md:text-base whitespace-nowrap">Bernardo Franceschina</span>
          </div>
        </div>

         <div class="absolute top-1/2 -right-4 md:-right-12 z-10 animate-float-delayed">
          <div class="bg-[#FFD43B] text-black font-bold p-2 md:p-3 rounded-lg rotate-[5deg] shadow-lg border-2 border-white">
            <Icon name="ph:code" class="w-6 h-6 md:w-8 md:h-8" />
          </div>
        </div>
        <div class="absolute -bottom-10 left-4 md:left-10 w-20 h-20 md:w-28 md:h-28 bg-rose-500 rounded-full mix-blend-screen filter blur-[40px] opacity-40 animate-pulse"></div>
      </div>
    </div>


    <div class="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:pr-12 xl:pr-24 z-20 order-1 lg:order-2 pt-24 lg:pt-0">
      <h1 class="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-[1.1] mb-8 font-display">
        <span class="block text-gray-400 text-lg md:text-2xl lg:text-3xl font-sans font-normal mb-4 md:mb-6 tracking-widest uppercase pl-3 border-l-2 border-yellow-400/50">
          {{ t('hero.tagline') }}
        </span>
        <i18n-t keypath="hero.title" tag="span">
          <template #highlight>
            <span class="relative whitespace-nowrap inline-block mt-1 md:mt-2">
              <span class="absolute inset-0 bg-yellow-400/90 -rotate-1 skew-x-3 rounded-sm transform origin-left animate-highlight"></span>
              <span class="relative text-black font-serif italic font-bold px-2 md:px-4 md:pr-6">
                {{ t('hero.title_highlight') }}
              </span>
            </span>
          </template>
          <template #break>
            <br class="hidden md:block" />
          </template>
        </i18n-t>
      </h1>

      <p class="text-base md:text-xl text-gray-400 max-w-md leading-relaxed font-sans mb-8 md:mb-10 pl-3">
        {{ t('hero.subtitle') }}
      </p>

      <div class="w-fit pl-3">
        <button class="group relative px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 bg-transparent hover:bg-white text-white hover:text-black transition-all duration-300 ease-out flex items-center gap-3 overflow-hidden">
          <span class="relative z-10 font-medium tracking-wide text-sm md:text-lg" @click.prevent="scrollToSection('#projects')">{{ t('hero.cta') }}</span>
          <Icon name="ph:arrow-right" class="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global'
})

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
h1 {
    font-family: 'Times New Roman', serif;
}

@keyframes highlight-grow {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(1); }
}
.animate-highlight {
    animation: highlight-grow 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards 0.5s;
    transform-origin: left;
    transform: scaleX(0) skewX(-3deg) rotate(-1deg);
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(12deg); }
    50% { transform: translateY(-10px) rotate(10deg); }
}
.animate-float {
    animation: float 4s ease-in-out infinite;
}

@keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(5deg); }
    50% { transform: translateY(-15px) rotate(8deg); }
}
.animate-float-delayed {
    animation: float-delayed 5s ease-in-out infinite 1s;
}

@keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
.animate-spin-slow {
    animation: spin-slow 20s linear infinite;
}

@keyframes pulse-slow {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.1); }
}
.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}
</style>