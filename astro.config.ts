/* eslint-disable node/prefer-global/process */
import cloudflare from "@astrojs/cloudflare";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";

import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import svelte from "@astrojs/svelte";
import rehypeEnhancedTables from "@benjc/rehype-enhanced-tables";
import withToc from "@stefanprobst/rehype-extract-toc";

import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defaultConfig } from "astro-better-image-service";
import expressiveCode from "astro-expressive-code";
import { defineConfig, fontProviders } from "astro/config";
import rehypeCallouts from "rehype-callouts";

import bundlesize from "vite-plugin-bundlesize";
import rehypeAutolink from "./plugins/rehype-autolink";
import rehypeFigCaption from "./plugins/rehype-figcaption";
import remarkReadingTime from "./plugins/remark-reading-time";

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE =
	process.env.NETLIFY === "true" && process.env.CONTEXT !== "production"
		? process.env.DEPLOY_PRIME_URL
		: undefined;

const site = NETLIFY_PREVIEW_SITE || "https://queerwinnipeg.ca";

// https://astro.build/config
export default defineConfig({
	site,
	cacheDir: "./.astro-cache",
	prefetch: { prefetchAll: true },
	image: {
		service: {
			config: {
				...defaultConfig,
				sharp: {
					...defaultConfig.sharp,
					jpeg: {
						mozjpeg: true,
					},
					avif: {
						// cspell:ignore subsampling
						chromaSubsampling: "4:2:0",
					},
				},
			},
			entrypoint: "./src/image-service.ts",
		},
	},
	experimental: {
		clientPrerender: true,
		fonts: [
			{
				provider: fontProviders.fontsource(),
				name: "Montserrat",
				cssVariable: "--font-montserrat",
				fallbacks: ["Figtree", "ui-sans-serif", "system-ui"],
				weights: ["400 800"],
				subsets: ["latin"],
			},
			{
				provider: fontProviders.fontsource(),
				name: "Figtree",
				cssVariable: "--font-sans",
				weights: ["300 800"],
				subsets: ["latin"],
			},
		],
		responsiveImages: true,
	},
	markdown: {
		remarkPlugins: [
			// @ts-expect-error - I don't know how to make types work, but the
			// plugin works at least
			remarkReadingTime,
		],
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
						wrapper: "table-wrapper",
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
			// @ts-expect-error - No clue
			...rehypeAutolink(),
			// @ts-expect-error - No clue (help)
			withToc,
			// @ts-expect-error - No clue (pls help)
			withTocExport,
		],
	},
	integrations: [
		AutoImport({
			// https://github.com/delucis/astro-auto-import/tree/main/packages/astro-auto-import
			imports: ["/src/components/articles/Image.astro"],
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
		// @playform/compress should always be last
		(await import("@playform/compress")).default({
			// Images and SVGs are handled by astro-better-image-service
			Image: false,
			SVG: false,
			// Rest of the config
			HTML: {
				"html-minifier-terser": {
					removeComments: true,
					ignoreCustomComments: [],
				},
			},
		}),
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
