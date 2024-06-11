import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";

import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

import { rehypeAutolink } from "./plugins/rehype-autolink";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import rehypeSlug from "rehype-slug";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";

export const output = "hybrid";
export const adapter =
	process.env.NETLIFY === "true"
		? "netlify"
		: process.env.CF_PAGES === "1"
			? "cloudflare"
			: "netlify";

// https://astro.build/config
export default defineConfig({
	site: "https://queerwinnipeg.ca",
	markdown: {
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [rehypeSlug, ...rehypeAutolink(), withToc, withTocExport],
	},
	integrations: [
		AutoImport({
			// https://github.com/delucis/astro-auto-import/tree/main/packages/astro-auto-import
			imports: [
				"/src/components/primitives/Callout.astro",
				"/src/components/articles/Image.astro",
				"/src/components/articles/FigureCaption.astro",
			],
		}),
		mdx(),
		// svelte(),
		tailwind(),
	],
	output: output,
	adapter: netlify(),
});
