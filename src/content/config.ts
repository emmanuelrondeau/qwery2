import { z, defineCollection, reference } from "astro:content";
import DefaultImageCover from "./posts/how-to-start-hrt-in-winnipeg/consent-form.webp";

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
			tag: TagEnum.default("Other"),
			otherTags: z.array(TagEnum).optional(),
			cover: image().default(DefaultImageCover),
			coverAlt: z.string().optional(),
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
