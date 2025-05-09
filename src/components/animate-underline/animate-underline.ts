/**
 * Reason why this is a separate component, and not a rehype one, is to
 * progressively add non-traditional underlines for cases where no JavaScript
 * is loaded.
 */
export class AnimateUnderline extends HTMLElement {
	connectedCallback() {
		const anchors: NodeListOf<HTMLAnchorElement> = this.querySelectorAll(
			`* a:not(:where([class~="not-format"], [class~="not-format"] *)):not(#bigger-picture):not(:where(.heading-wrapper *))`,
		);

		anchors.forEach((value) => {
			value.classList.add("group/underline");
			const span = document.createElement("span");
			span.textContent = value.textContent;
			span.replaceChildren(...value.childNodes.values());
			value.replaceChildren(span);
		});
	}
}

customElements.define("animate-underline", AnimateUnderline);
