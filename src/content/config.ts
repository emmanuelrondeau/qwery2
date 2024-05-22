import { z, defineCollection, reference } from "astro:content";

const authors = defineCollection({
	type: "content",
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
			tag: TagEnum.default("Other"),
			otherTags: z.array(TagEnum).optional(),
			cover: image(),
			authors: z.array(reference("authors")),
			created: z.date(),
			lastEdited: z.date().optional(),
		}),
});

export const TagEnum = z.enum([
	"Fashion",
	"Finances",
	"Medical",
	"Mental Health",
	"Mutual Aid",
	"Other",
	"Politics",
	"Transportation",
]);
export type TagEnum = z.infer<typeof TagEnum>;

export const collections = {
	posts: posts,
	authors: authors,
};
