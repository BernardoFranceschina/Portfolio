import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        order: z.number(),
        id: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string(),
        second_image: z.string(),
        architecture_image: z.string(),
        color: z.string(),
        tags: z.array(z.string()),
        year: z.string(),
        company: z.string(),
        category: z.string(),
        
        locale: z.string(), 
        
        challenge_text: z.string(),
        development_text: z.string(),
        result_text: z.string()
      })
    })
  }
})