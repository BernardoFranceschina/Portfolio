<template>
  <div class="bg-[#0a0a0c] min-h-screen selection:bg-yellow-500/30">
    
    <SiteNavbar />

    <main id="site-content">
      <div id="home">
        <HeroSection />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <TechStackSection />

      <div id="projects">
        <ProjectsSection @open-project="openProject" />
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
const { projects } = await useProjects()

const isProjectOpen = ref(false)
const activeProject = ref(null)

const openProject = (project) => {
  activeProject.value = project
  isProjectOpen.value = true
}

const activeIndex = computed(() => {
  if (!activeProject.value || !projects.value) return -1
  return projects.value.findIndex(p => p.id === activeProject.value.id)
})

const nextProject = computed(() => {
  if (!projects.value || activeIndex.value === -1 || activeIndex.value === projects.value.length - 1) return null
  return projects.value[activeIndex.value + 1]
})

const prevProject = computed(() => {
  if (!projects.value || activeIndex.value <= 0) return null
  return projects.value[activeIndex.value - 1]
})

const siteUrl = 'https://franceschina.dev/'

defineOgImage({
  component: 'Portfolio',
  title: 'Bernardo Franceschina',
  description: locale.value === 'pt' ? 'Desenvolvedor full stack a mais de 5 anos entregando plataformas completas.' : 'Full stack developer with over 5 years of experience delivering complete platforms.',
  label: 'Portfolio',
  cta: locale.value === 'pt' ? 'Ver projetos' : 'View projects',
  domain: 'franceschina.dev',
  photo: `${siteUrl}/bernardo.png`,
})

useHead({
  titleTemplate: (titleChunk) => titleChunk || 'Bernardo Franceschina Portfolio',
  htmlAttrs: {
    lang: computed(() => locale.value === 'pt' ? 'pt-BR' : 'en-US'),
    class: 'bg-[#0a0a0c]'
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
          'jobTitle': 'Full Stack Developer',
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
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('meta.title')),
  twitterDescription: computed(() => t('meta.description')),
  themeColor: '#0a0a0c'
})
</script>

<style>
html {
  scroll-behavior: smooth;
  background-color: #0a0a0c;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0c; }
::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #444; }

/* Global type smoothing */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Selection color */
::selection {
  background: rgba(250, 204, 21, 0.3);
  color: #fff;
}
</style>