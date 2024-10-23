import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";

import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import rehypeAutolink from "./plugins/rehype-autolink";
import rehypeCallouts from "rehype-callouts";
import rehypeEnhancedTables from "@benjc/rehype-enhanced-tables";
import rehypeFigCaption from "./plugins/rehype-figcaption";
import remarkReadingTime from "./plugins/remark-reading-time";
import rehypeSlug from "rehype-slug";

import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";

import bundlesize from "vite-plugin-bundlesize";

// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './tailwind.config.mjs'

// const fullConfig = resolveConfig(tailwindConfig)

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
	prefetch: { prefetchAll: true },
	markdown: {
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [
			[
				rehypeCallouts,
				{
					callouts: {
						info: { title: "Info:" },
						warning: { title: "Warning:" },
						caution: { title: "Caution:" },
					},
					showIndicator: false,
				},
			],
			[
				rehypeEnhancedTables,
				{
					classes: {
						wrapper: "overflow-x-auto",
						caption: "",
						table: "mt-0 mb-0",
						tbody: "",
						td: "",
						tfoot: "",
						th: "whitespace-nowrap pt-4",
						thead: "",
						tr: "",
					},
				},
			],
			rehypeFigCaption,
			rehypeSlug,
			...rehypeAutolink(),
			withToc,
			withTocExport,
		],
	},
	integrations: [
		AutoImport({
			// https://github.com/delucis/astro-auto-import/tree/main/packages/astro-auto-import
			imports: [
				"/src/components/primitives/Callout.astro",
				"/src/components/articles/Image.astro",
			],
		}),
		mdx(),
		svelte(),
		tailwind(),
	],
	vite: {
		build: { sourcemap: "hidden" },
		plugins: [bundlesize({ allowFail: true })],
	},
	output: output,
	adapter: netlify(),
});
