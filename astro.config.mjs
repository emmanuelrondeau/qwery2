import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import { remarkReadingTime } from "./remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	integrations: [
		AutoImport({
			// https://github.com/delucis/astro-auto-import/tree/main/packages/astro-auto-import
			imports: [
				"/src/components/primitives/Callout.astro",
				"/src/components/articles/Image.astro",
				"/src/components/articles/FigureCaption.astro",
				{
					"/src/assets/images/default-thumb.jpg": [
						["default", "DefaultImageCover"],
					],
				},
			],
		}),
		react(),
		tailwind(),
		mdx(),
	],
	output: "hybrid",
});
