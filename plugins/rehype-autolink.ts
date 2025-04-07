import type { RehypePlugins } from "astro";
import { toString as hastToString } from "hast-util-to-string";
import { h } from "hastscript";
import rehypeAutolinkHeadings, {
	type Options as AutolinkOptions,
} from "rehype-autolink-headings";

const AnchorLinkIcon = h(
	"span",
	{ ariaHidden: "true", class: "anchor-icon" },
	"#",
);

/**
 * Configuration for the `rehype-autolink-headings` plugin.
 * This set-up was informed by https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
 */
const autolinkConfig: AutolinkOptions = {
	properties: { class: "anchor-link" },
	behavior: "after",
	group: ({ tagName }) =>
		h("div", { tabIndex: -1, class: `heading-wrapper level-${tagName}` }),
	content: (heading) => [
		AnchorLinkIcon,
		h(
			"span",
			{ "is:raw": true, class: "sr-only" },
			`Section titled ${encodeURIComponent(hastToString(heading))}`,
		),
	],
};

/**
 * Configure heading anchor links.
 * Spread this into Astro’s `markdown.rehypePlugins` option.
 */
const rehypeAutolink = (): RehypePlugins => [
	[rehypeAutolinkHeadings, autolinkConfig],
	// rehypei18nAutolinkHeadings(),
];
export default rehypeAutolink;

/**
 * MIT License
 *
 * Copyright (c) 2022 withastro
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
