<template>
  <div class="bg-[#0a0a0a] min-h-screen selection:bg-yellow-500/30">
    
    <SiteNavbar />
    <main id="site-content">
      <div id="home">
        <HeroSection @scroll-request="scrollToProjects" />
      </div>

      <ProjectIntro />

      <div id="projects">
        <ProjectStack @open-project="openProject"/>
      </div>

      <ProjectModal
        v-if="activeProject"
        :isOpen="isProjectOpen"
        :project="activeProject"
        :next-project="nextProject"
        :prev-project="prevProject"
        @close="isProjectOpen = false"
        @navigate="openProject"
      />
    </main>

    <div id="contact">
      <SiteFooter />
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const { projects } = useProjects()
const isProjectOpen = ref(false)
const activeProject = ref(null)

const scrollToProjects = () => {
  const el = document.getElementById('projects');
  if(el) el.scrollIntoView({ behavior: 'smooth' });
}

const openProject = (project) => {
  activeProject.value = project
  isProjectOpen.value = true
}

const activeIndex = computed(() => {
  if (!activeProject.value) return -1
  return projects.findIndex(p => p.id === activeProject.value.id)
})

const nextProject = computed(() => {
  if (activeIndex.value === -1 || activeIndex.value === projects.length - 1) return null
  return projects[activeIndex.value + 1]
})

const prevProject = computed(() => {
  if (activeIndex.value <= 0) return null
  return projects[activeIndex.value - 1]
})

const siteUrl = 'https://franceschina.dev/'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'Bernardo Franceschina Portfolio'
  },
  htmlAttrs: {
    lang: computed(() => locale.value === 'pt' ? 'pt-BR' : 'en-US'),
    class: 'bg-[#0f0f11]'
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: siteUrl } 
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        'mainEntity': {
          '@type': 'Person',
          'name': 'Bernardo Franceschina',
          'jobTitle': 'Software Developer',
          'url': siteUrl,
          'sameAs': [
            'https://github.com/bernardofranceschina',
            'https://linkedin.com/in/bernardo-franceschina' 
          ]
        }
      })
    }
  ]
})

useSeoMeta({
  title: computed(() => t('meta.title')),
  description: computed(() => t('meta.description')),
  
  ogTitle: computed(() => t('meta.title')),
  ogDescription: computed(() => t('meta.description')),
  ogType: 'website',
  ogSiteName: 'Bernardo Franceschina Portfolio',
  ogUrl: siteUrl,
  
  ogImage: `${siteUrl}/og_image.png`,
  ogImageAlt: computed(() => t('meta.og_image_alt')),
  ogImageWidth: 1200,
  ogImageHeight: 630,

  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('meta.title')),
  twitterDescription: computed(() => t('meta.description')),
  twitterImage: `${siteUrl}/og_image.png`,
  
  themeColor: '#0f0f11'
})
</script>

<style>
html {
  scroll-behavior: smooth;
  background-color: #0f0f11;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0f0f11; 
}
::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>