import { z, defineCollection, reference } from "astro:content";

const authors = defineCollection({
	type: "data",
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			profile: image().optional(),
		}),
});

const posts = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			draft: z.boolean().optional(),
			title: z.string(),
			description: z.string().optional(),
			tag: z.string().optional(),
			otherTags: z.array(z.string()).optional(),
			cover: image(),
			coverAlt: z.string().optional(),
			authors: z.array(reference("authors")),
			created: z.date(),
			lastEdited: z.date().optional(),
		}),
});

export const collections = {
	posts: posts,
	authors: authors,
};
