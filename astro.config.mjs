import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";

import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import { rehypeAutolink } from "./plugins/rehype-autolink";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import rehypeSlug from "rehype-slug";
import withToc from "@stefanprobst/rehype-extract-toc"
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx"

// https://astro.build/config
export default defineConfig({
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
		svelte(),
		tailwind(),
	],
	output: "hybrid",
	adapter:
		process.env.NETLIFY === "true"
			? netlify()
			: process.env.CF_PAGES === "1"
				? cloudflare()
				: undefined,
});
