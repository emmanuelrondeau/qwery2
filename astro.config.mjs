import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";

import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";

import rehypeAutolink from "./plugins/rehype-autolink";
import rehypeCallouts from "rehype-callouts";
import rehypeEnhancedTables from "@benjc/rehype-enhanced-tables";
import rehypeFigCaption from "./plugins/rehype-figcaption";
import remarkReadingTime from "./plugins/remark-reading-time";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";

import bundlesize from "vite-plugin-bundlesize";
import tailwindcss from "@tailwindcss/vite";

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE =
	process.env.CONTEXT !== "production" && process.env.DEPLOY_PRIME_URL;

const site = NETLIFY_PREVIEW_SITE || "https://queerwinnipeg.ca";

// https://astro.build/config
export default defineConfig({
	site,
	prefetch: { prefetchAll: true },
	experimental: {
		clientPrerender: true,
	},
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
						table: "",
						tbody: "",
						td: "",
						tfoot: "",
						th: "whitespace-nowrap",
						thead: "",
						tr: "",
					},
				},
			],
			rehypeFigCaption,
			rehypeHeadingIds,
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
	],
	vite: {
		build: { sourcemap: "hidden" },
		plugins: [bundlesize({ allowFail: true }), tailwindcss()],
	},
	adapter:
		process.env.CF_PAGES == "1"
			? cloudflare()
			: process.env.NETLIFY === "true"
				? netlify()
				: undefined,
});
