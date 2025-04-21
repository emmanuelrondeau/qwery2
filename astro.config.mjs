import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import svelte from "@astrojs/svelte";

import rehypeEnhancedTables from "@benjc/rehype-enhanced-tables";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import rehypeCallouts from "rehype-callouts";
import rehypeAutolink from "./plugins/rehype-autolink";
import rehypeFigCaption from "./plugins/rehype-figcaption";
import remarkReadingTime from "./plugins/remark-reading-time";

import tailwindcss from "@tailwindcss/vite";
import bundlesize from "vite-plugin-bundlesize";

import expressiveCode from "astro-expressive-code";

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
		expressiveCode({
			defaultProps: {
				overridesByLang: {
					"markdown,mdx": { wrap: true },
				},
			},
			shiki: {
				bundledLangs: ["mdx", "markdown"],
			},
			styleOverrides: {
				// UI font family explicitly not overwritten, as the main typeface of
				// this website has alignment issues
				frames: {
					shadowColor: "#00000000",
				},
			},
			themeCssSelector: (theme) =>
				`[data-theme='${
					theme.name.includes(
						// Input light theme here
						"latte",
					)
						? "light"
						: "dark"
				}']`,
			themes: ["catppuccin-latte", "one-dark-pro"],

			// Theoretically better as "false" for accessibility, although we already
			// mess with selection colors. Since these are tailored to their
			// respective backgrounds, it's probably best
			useThemedSelectionColors: true,
		}),
		mdx(),
		svelte(),
	],
	vite: {
		build: { sourcemap: "hidden" },
		plugins: [bundlesize({ allowFail: true }), tailwindcss()],
	},
	adapter:
		process.env.CF_PAGES === "1"
			? cloudflare()
			: process.env.NETLIFY === "true"
				? netlify()
				: undefined,
});
