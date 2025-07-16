export const prerender = true;

import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context: { site: string }) {
	const posts = await getCollection("posts");
	return rss({
		// `<title>` field in output xml
		title: "Queer Winnipeg",
		// `<description>` field in output xml
		description:
			"We're an online website of various written resources, primarily for queer people living in Winnipeg. Our goal is to help you navigate through life, through articles!",
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: posts
			.filter((post) => !post.data.draft && !post.data.hideFromRss)
			.map((post) => ({
				title: post.data.title,
				pubDate: post.data.created,
				description: post.data.description,
				// customData: post.data.customData,
				link: `/posts/${post.slug}/`,
			})),
		customData: "<language>en-us</language>",
	});
}
