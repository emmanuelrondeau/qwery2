import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
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
			.filter((post) => !post.draft)
			.map((post) => ({
				title: post.data.title,
				pubDate: post.data.created,
				description: post.data.description,
				customData: post.data.customData,
				link: `/post/${post.slug}/`,
			})),
		customData: `<language>en-us</language>`,
	});
}
