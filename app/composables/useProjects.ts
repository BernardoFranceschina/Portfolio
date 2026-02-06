export const useProjects = async () => {
  const { locale } = useI18n()

  const { data: projects, pending, error } = await useAsyncData('projects-list-' + locale.value, async () => {
    return await queryCollection("projects")
      .where('locale', '=', locale.value)
      .order('order', 'ASC')
      .all()
  }, {
    watch: [locale]
  })

  return { 
    projects,
    pending,
    error
  }
}