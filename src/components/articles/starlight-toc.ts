import { PAGE_TITLE_ID } from "../../constants";

export class StarlightTOC extends HTMLElement {
	private _current = this.querySelector(
		'a[aria-current="true"]',
	) as HTMLAnchorElement | null;
	private minH = Number.parseInt(this.dataset.minH || "2", 10);
	private maxH = Number.parseInt(this.dataset.maxH || "3", 10);

	protected set current(link: HTMLAnchorElement) {
		if (link === this._current) return;
		if (this._current) this._current.removeAttribute("aria-current");
		link.setAttribute("aria-current", "true");
		this._current = link;
	}

	constructor() {
		super();

		/** All the links in the table of contents. */
		const links = [...this.querySelectorAll("a")];

		/** Test if an element is a table-of-contents heading. */
		const isHeading = (el: Element): el is HTMLHeadingElement => {
			if (el instanceof HTMLHeadingElement) {
				// Special case for page title h1
				if (el.id === PAGE_TITLE_ID) return true;
				// Check the heading level is within the user-configured limits for the ToC
				const level = el.tagName[1];
				if (level) {
					const int = Number.parseInt(level, 10);
					if (int >= this.minH && int <= this.maxH) return true;
				}
			}
			return false;
		};

		/** Walk up the DOM to find the nearest heading. */
		const getElementHeading = (
			el: Element | null,
		): HTMLHeadingElement | null => {
			if (!el) return null;
			const origin = el;
			while (el) {
				if (isHeading(el)) return el;
				// Assign the previous sibling’s last, most deeply nested child to el.
				el = el.previousElementSibling;
				while (el?.lastElementChild) {
					el = el.lastElementChild;
				}
				// Look for headings amongst siblings.
				const h = getElementHeading(el);
				if (h) return h;
			}
			// Walk back up the parent.
			return getElementHeading(origin.parentElement);
		};

		/** Handle intersections and set the current link to the heading for the current intersection. */
		const setCurrent: IntersectionObserverCallback = (entries) => {
			for (const { isIntersecting, target } of entries) {
				if (!isIntersecting) continue;
				const heading = getElementHeading(target);
				if (!heading) continue;
				const link = links.find(
					(link) => link.hash === "#" + encodeURIComponent(heading.id),
				);
				if (link) {
					this.current = link;
					break;
				}
			}
		};

		// Observe elements with an `id` (most likely headings) and their siblings.
		// Also observe direct children of `.content` to include elements before
		// the first heading.
		const toObserve = document.querySelectorAll(
			"main [id], main [id] ~ *, main .content > *",
		);

		let observer: IntersectionObserver | undefined;
		const observe = () => {
			if (observer) observer.disconnect();
			observer = new IntersectionObserver(setCurrent, {
				rootMargin: this.getRootMargin(),
			});
			toObserve.forEach((h) => observer!.observe(h));
		};
		observe();

		const onIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
		let timeout: NodeJS.Timeout;
		window.addEventListener("resize", () => {
			// Disable intersection observer while window is resizing.
			if (observer) observer.disconnect();
			clearTimeout(timeout);
			timeout = setTimeout(() => onIdle(observe), 200);
		});
	}

	private getRootMargin(): `-${number}px 0% ${number}px` {
		const navBarHeight =
			document.querySelector("header")?.getBoundingClientRect().height || 0;
		// `<summary>` only exists in mobile ToC, so will fall back to 0 in large viewport component.
		const mobileTocHeight =
			this.querySelector("summary")?.getBoundingClientRect().height || 0;
		/** Start intersections at nav height + 2rem padding. */
		const top = navBarHeight + mobileTocHeight + 2 * 16;
		/** End intersections `53px` later. This is slightly more than the maximum `margin-top` in Markdown content. */
		const bottom = top + 53;
		const height = document.documentElement.clientHeight;
		return `-${top}px 0% ${bottom - height}px`;
	}
}

customElements.define("starlight-toc", StarlightTOC);

// MIT License
//
// Copyright (c) 2023 [Astro contributors](https://github.com/withastro/starlight/graphs/contributors)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
