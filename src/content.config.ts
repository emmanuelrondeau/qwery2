import { defineCollection, reference, z } from "astro:content";

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
			containsReferralLinks: z.boolean().optional(),
			title: z.string(),
			description: z.string().optional(),
			tag: TagEnum.default("Other"),
			otherTags: z.array(TagEnum).optional(),
			cover: image().optional(),
			coverMetadata: z
				.object({
					type: CoverTypeEnum.default("image"),
					author: z.string().optional(),
					source: z.string().optional(),
					license: z.string().optional(),
				})
				.optional(),
			authors: z.array(reference("authors")),
			created: z.date(),
			lastEdited: z.date().optional(),
			license: z.string().optional(),
		}),
});

export const TagEnum = z.enum([
	"Fashion",
	"Finances",
	"Legal",
	"Medical",
	"Mental Health",
	"Meta",
	"Mutual Aid",
	"Other",
	"Politics",
	"Privacy",
	"Technology",
	"Transportation",
]);
export type TagEnum = z.infer<typeof TagEnum>;

export const CoverTypeEnum = z.enum(["photo", "illustration", "image"]);

export type CoverTypeEnum = z.infer<typeof CoverTypeEnum>;

export const collections = {
	posts: posts,
	authors: authors,
};
