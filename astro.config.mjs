import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import a11yEmoji from "@fec/remark-a11y-emoji";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [remarkReadingTime, a11yEmoji],
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
		react(),
		tailwind(),
		mdx(),
	],
	output: "hybrid",
	adapter: netlify(),
});
