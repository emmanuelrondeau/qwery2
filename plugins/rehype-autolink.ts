import { h } from "hastscript";
import { toString } from "hast-util-to-string";
import rehypeAutolinkHeadings, {
	type Options as AutolinkOptions,
} from "rehype-autolink-headings";
import type { RehypePlugins } from "astro";

const AnchorLinkIcon = h(
	"span",
	{ ariaHidden: "true", class: "anchor-icon" },
	// h(
	// 	"svg",
	// 	{ width: 16, height: 16, viewBox: "0 0 24 24" },
	// 	h("path", {
	// 		fill: "currentColor",
	// 		d: "m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z",
	// 	}),
	// ),
	"#",
);

const createSROnlyLabel = (text: string) => {
	const node = h("span.sr-only", `Section titled ${escape(text)}`);
	node.properties["is:raw"] = true;
	return node;
};

/**
 * Configuration for the `rehype-autolink-headings` plugin.
 * This set-up was informed by https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
 */
const autolinkConfig: AutolinkOptions = {
	properties: { class: "anchor-link" },
	behavior: "before",
	group: ({ tagName }) =>
		h("div", { tabIndex: -1, class: `heading-wrapper level-${tagName}` }),
	content: (heading) => [AnchorLinkIcon, createSROnlyLabel(toString(heading))],
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
