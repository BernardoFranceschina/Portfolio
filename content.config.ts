import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // o "caderno": textos do blog. Criou o .md, o texto aparece; `hide: true` esconde da home e da página.
    caderno: defineCollection({
      type: 'page',
      source: 'caderno/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        tag: z.string(),
        minutes: z.number().optional(),
        hide: z.boolean().default(false),
        photo: z.string().default('1034'),
      }),
    }),
  },
})
