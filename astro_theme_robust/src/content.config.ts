import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string().optional(),
		thumbnail: z.string().optional(),
		date: z.date(),
		lastmod: z.date().optional(),
		draft: z.boolean().default(false),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		toc: z.boolean().default(false)
	})
})

export const collections = { blog }
