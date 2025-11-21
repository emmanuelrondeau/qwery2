/* eslint-disable node/prefer-global/process */
import "dotenv/config";
import AutoImport from "astro-auto-import";
import bundlesize from "vite-plugin-bundlesize";
import cloudflare from "@astrojs/cloudflare";
import { defaultConfig } from "astro-better-image-service";
import {
	defineConfig,
	fontProviders,
	passthroughImageService,
} from "astro/config";
import expressiveCode from "astro-expressive-code";

import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

import rehypeAutolink from "./src/plugins/rehype-autolink";
import rehypeCallouts from "rehype-callouts";
import rehypeEnhancedTables from "@benjc/rehype-enhanced-tables";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeFigCaption from "./src/plugins/rehype-figcaption";
import remarkReadingTime from "./src/plugins/remark-reading-time";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";

import { SOCIAL_DISCORD } from "./src/constants";

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE =
	process.env.NETLIFY === "true" && process.env.CONTEXT !== "production"
		? process.env.DEPLOY_PRIME_URL
		: undefined;
const DISABLE_IMAGE_OPTIMIZATION =
	process.env.DISABLE_IMAGE_OPTIMIZATION === "true";

if (DISABLE_IMAGE_OPTIMIZATION) {
	console.log(
		"Image optimization and placeholder generation is disabled" +
			' (environment variable DISABLE_IMAGE_OPTIMIZATION was set to "true")',
	);
}

const site = NETLIFY_PREVIEW_SITE || "https://queerwinnipeg.ca";

// https://astro.build/config
export default defineConfig({
	site,
	cacheDir: "./.astro-cache",
	prefetch: { prefetchAll: true },
	image: {
		responsiveStyles: true,
		service: DISABLE_IMAGE_OPTIMIZATION
			? passthroughImageService()
			: {
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
				name: "Montserrat",
				cssVariable: "--font-montserrat",
				provider: fontProviders.fontsource(),
				weights: ["400 800"],
				subsets: ["latin"],
				fallbacks: ["Figtree", "Noto Sans HK", "ui-sans-serif", "system-ui"],
			},
			{
				name: "Figtree",
				cssVariable: "--font-sans",
				provider: fontProviders.fontsource(),
				weights: ["300 800"],
				subsets: ["latin"],
				fallbacks: ["Noto Sans HK", "ui-sans-serif", "system-ui"],
			},
			{
				name: "Noto Sans HK",
				cssVariable: "--font-noto-sans-hk",
				provider: fontProviders.fontsource(),
				styles: ["normal"],
				subsets: ["chinese-hongkong"],
			},
			{
				//
				// https://source.typekit.com/source-han-serif/#get-the-fonts
				name: "Noto Serif SC",
				cssVariable: "--font-noto-serif-sc",
				provider: fontProviders.fontsource(),
				subsets: ["chinese-simplified"],
			},
		],
	},
	redirects: {
		"/discord": { status: 302, destination: SOCIAL_DISCORD },
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
			useStyleReset: false,
			// Theoretically better as "false" for accessibility, although we already
			// mess with selection colors. Since these are tailored to their
			// respective backgrounds, it's probably best
			useThemedSelectionColors: true,
		}),
		mdx(),
		svelte(),
		icon({
			// https://www.astroicon.dev/reference/configuration#include
			include: {
				"material-symbols": [
					"light-mode-outline",
					"dark-mode-outline",
					"laptop-windows-outline",
				],
				ph: ["caret-down"],
			},
		}),
		sitemap(),

		// @playform/compress should always be last
		(await import("@playform/compress")).default({
			// Images and SVGs are handled by astro-better-image-service
			Image: false,
			SVG: false,
			// Rest of the config
			HTML: {
				"html-minifier-terser": {},
			},
			JavaScript: false,
		}),
	],
	vite: {
		build: { sourcemap: "hidden" },
		plugins: [bundlesize({ allowFail: true }), tailwindcss()],
	},
	adapter:
		process.env.CF_PAGES === "1"
			? cloudflare({ imageService: "custom" })
			: process.env.NETLIFY === "true"
				? netlify()
				: undefined,
});
