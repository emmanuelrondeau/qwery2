interface Options {
	/**
	 * string can be a media query string
	 */
	closeClickOutside: boolean | "close-click-outside";
	/**
	 * string can be a media query string
	 */

	forceStateClose: boolean | "force-close";
	/**
	 * string can be a media query string
	 */

	forceStateOpen: boolean | "force-open";
	/**
	 * string can be a media query string
	 */
	closeEsc: boolean | string;
	forceStateRestore: boolean;
}

class DetailsUtilsForceState {
	options: Options;
	summaryElement: Element | null;
	private _previousStates: Record<string, any> = {};

	constructor(
		public detailsElement: HTMLDetailsElement,
		options?: Partial<Options>,
	) {
		this.options = Object.assign(
			{
				closeClickOutside: false, // can also be a media query str
				forceStateClose: false, // can also be a media query str
				forceStateOpen: false, // can also be a media query str
				closeEsc: false, // can also be a media query str
				forceStateRestore: true,
			},
			options,
		);

		this.detailsElement = detailsElement;
		this.summaryElement = detailsElement.querySelector(":scope > summary");
	}

	getMatchingMedia(el: Element, mediaQuery: boolean | string) {
		if (!el) return undefined;

		if (mediaQuery && mediaQuery === true) {
			return { matches: true } as MediaQueryList;
		}

		if (mediaQuery && "matchMedia" in window) {
			return window.matchMedia(mediaQuery);
		}

		// Silently fail
		return undefined;
	}

	// warning: no error checking if the open/close media queries are configured wrong and overlap in weird ways
	init() {
		const openMatchMedia = this.getMatchingMedia(
			this.detailsElement,
			this.options.forceStateOpen,
		);
		const closeMatchMedia = this.getMatchingMedia(
			this.detailsElement,
			this.options.forceStateClose,
		);

		// When both force-close and force-open are valid, it toggles state
		if (
			openMatchMedia &&
			openMatchMedia.matches &&
			closeMatchMedia &&
			closeMatchMedia.matches
		) {
			this.setState(!this.detailsElement.open);
		} else {
			if (openMatchMedia) {
				this.setState(true);
			} else if (closeMatchMedia) {
				this.setState(false);
			}
		}

		if (openMatchMedia) this.addListener(openMatchMedia, "for-open");
		if (closeMatchMedia) this.addListener(closeMatchMedia, "for-close");
	}

	addListener(matchMedia: MediaQueryList, type: "for-open" | "for-close") {
		// Force stated based on force-open/force-close attribute value in a media query listener
		matchMedia.onchange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				this._previousStates[type] = this.detailsElement.open;
				if (this.detailsElement.open !== (type === "for-open")) {
					this.setState(type === "for-open");
				}
				return;
			}

			if (
				this.options.forceStateRestore &&
				this._previousStates[type] !== undefined
			) {
				if (this.detailsElement.open !== this._previousStates[type]) {
					this.setState(this._previousStates[type]);
				}
			}
		};
	}

	toggle() {
		const clickEvent = new MouseEvent("click", {
			view: window,
			bubbles: true,
			cancelable: true,
		});
		this.summaryElement?.dispatchEvent(clickEvent);
	}

	triggerClickToClose() {
		if (this.summaryElement && this.options.closeClickOutside) {
			this.toggle();
		}
	}

	setState(setOpen: boolean) {
		if (setOpen) {
			this.detailsElement.setAttribute("open", "open");
		} else {
			this.detailsElement.removeAttribute("open");
		}
	}
}

class DetailsUtilsAnimateDetails {
	summary: HTMLElement;
	duration: { open: number; close: number };
	content: HTMLElement | Element;
	contentHeight = 0;
	isPending = false;
	animation?: Animation;

	constructor(public detail: HTMLDetailsElement) {
		this.duration = {
			open: 200,
			close: 200,
		};
		const summary = this.detail.querySelector(
			":scope > summary",
		) as HTMLElement;
		if (!summary) throw new Error("Missing summary element within child");
		this.summary = summary;

		let content: Element | null = null;
		const contentTarget = this.detail.getAttribute("data-du-animate-target");
		if (contentTarget) {
			content = this.detail.closest(contentTarget);
		}
		if (!content) {
			content = this.summary.nextElementSibling;
		}
		if (!content) {
			// TODO wrap in an element?
			throw new Error(
				"For now <details-utils> requires a child element for animation.",
			);
		}
		this.content = content;

		this.summary.addEventListener("click", this.onclick.bind(this));
	}

	parseAnimationFrames(property: string, ...frames: any) {
		let keyframes = [];
		for (const frame of frames) {
			const obj: Record<string, any> = {};
			obj[property] = frame;
			keyframes.push(obj);
		}
		return keyframes;
	}

	getKeyframes(open: boolean) {
		const frames = this.parseAnimationFrames(
			"maxHeight",
			"0px",
			`${this.getContentHeight()}px`,
		);
		if (!open) {
			return frames.filter(() => true).reverse();
		}
		return frames;
	}

	getContentHeight() {
		if (this.contentHeight) {
			return this.contentHeight;
		}

		// Make sure our <details> component is open before we measure;
		// otherwise we'll measure a height of 0px.
		if (this.detail.open) {
			if ("offsetHeight" in this.content) {
				this.contentHeight = this.content.offsetHeight;
			} else {
				// Untested fallback if the content element is not an HTMLElement
				console.warn("Untested fallback for height detection");
				this.contentHeight = this.content.parentElement?.offsetHeight ?? 0;
			}
			return this.contentHeight;
		}
	}

	animate(open: boolean, duration: number) {
		const animatingClassName = open
			? "details-animating-open"
			: "details-animating-close";

		this.isPending = true;
		const frames = this.getKeyframes(open);
		this.animation = this.content.animate(frames, {
			duration,
			easing: "cubic-bezier(0.37, 0, 0.63, 1)",
		});
		this.detail.classList.add("details-animating", animatingClassName);

		this.animation.finished
			.catch((_error: any) => {})
			.finally(() => {
				this.isPending = false;
				this.detail.classList.remove("details-animating", animatingClassName);
			});

		// close() has to wait to remove the [open] attribute manually until after the animation runs
		// open() doesn’t have to wait, it needs [open] added before it animates
		if (!open) {
			this.animation.finished
				.catch((_error: any) => {})
				.finally(() => {
					this.detail.removeAttribute("open");
				});
		}
	}

	open() {
		if (this.contentHeight) {
			this.animate(true, this.duration.open);
		} else {
			// must wait a frame if we haven’t cached the contentHeight
			requestAnimationFrame(() => this.animate(true, this.duration.open));
		}
	}

	close() {
		this.animate(false, this.duration.close);
	}

	useAnimation() {
		return (
			"matchMedia" in window &&
			!window.matchMedia("(prefers-reduced-motion: reduce)").matches
		);
	}

	// Happens before state change when toggling
	onclick(event: MouseEvent) {
		// Do nothing if the click is inside of a link
		if (
			(event.target &&
				event.target instanceof HTMLElement &&
				(event.target as HTMLElement).closest("a[href]")) ||
			!this.useAnimation()
		) {
			return;
		}

		if (this.isPending) {
			if (this.animation) {
				this.animation.cancel();
			}
		} else if (this.detail.open) {
			// Cancel the click, because we want to wait to remove [open] until after the animation
			event.preventDefault();
			this.close();
		} else {
			this.open();
		}
	}
}

class DetailsUtils extends HTMLElement {
	attrs: {
		closeClickOutside: "close-click-outside";
		forceStateClose: "force-close";
		forceStateOpen: "force-open";
	} & Record<string, string> = {
		animate: "animate",
		closeEsc: "close-esc",
		closeClickOutside: "close-click-outside",
		forceStateClose: "force-close",
		forceStateOpen: "force-open",
		forceStateRestore: "force-restore",
		toggleDocumentClass: "toggle-document-class",
		closeClickOutsideButton: "data-du-close-click",
	};
	initialized = false;
	options: Options = {
		closeClickOutside: this.attrs.closeClickOutside,
		forceStateClose: this.attrs.forceStateClose,
		forceStateOpen: this.attrs.forceStateOpen,
		closeEsc: "",
		forceStateRestore: false,
	};
	_observer: MutationObserver | undefined;
	toggleDocumentClassName: string | null = null;

	constructor() {
		super();
		this._connect();
	}

	getAttributeValue(name: string) {
		const value = this.getAttribute(name);
		if (value === undefined || value === "") {
			return true;
		} else if (value === "false") {
			return false;
		} else if (value) {
			return value;
		}
		return false;
	}

	connectedCallback() {
		this._connect();
	}

	_connect() {
		if (this.children.length) {
			this._init();
			return;
		}

		// not yet available, watch it for init
		this._observer = new MutationObserver(this._init.bind(this));
		this._observer.observe(this, { childList: true });
	}

	_init() {
		if (this.initialized) {
			return;
		}
		this.initialized = true;

		this.options.closeClickOutside = this.getAttributeValue(
			this.attrs.closeClickOutside,
		) as boolean | "close-click-outside";
		this.options.closeEsc = this.getAttributeValue(this.attrs.closeEsc);
		this.options.forceStateClose = this.getAttributeValue(
			this.attrs.forceStateClose,
		) as boolean | "force-close";
		this.options.forceStateOpen = this.getAttributeValue(
			this.attrs.forceStateOpen,
		) as boolean | "force-open";
		this.options.forceStateRestore = Boolean(
			this.getAttributeValue(this.attrs.forceStateRestore),
		);

		// TODO support nesting <details-utils>
		const details = Array.from(
			this.querySelectorAll(`:scope details`) as NodeListOf<HTMLDetailsElement>,
		);
		for (const detail of details) {
			// override initial state based on viewport (if needed)
			const forceState = new DetailsUtilsForceState(detail, this.options);
			forceState.init();

			const animate = this.getAttribute(this.attrs.animate);
			if (animate !== "false" || animate !== null) {
				// animate the menus
				new DetailsUtilsAnimateDetails(detail);
			}
		}

		this.bindCloseOnEsc(details);
		this.bindClickoutToClose(details);

		this.toggleDocumentClassName = this.getAttribute(
			this.attrs.toggleDocumentClass,
		);
		if (this.toggleDocumentClassName) {
			this.bindToggleDocumentClass(details);
		}
	}

	bindCloseOnEsc(details: HTMLDetailsElement[]) {
		if (!this.options.closeEsc) {
			return;
		}

		document.documentElement.addEventListener(
			"keydown",
			(event) => {
				if (event.key !== "Escape") return;
				for (const detail of details) {
					if (detail.open) {
						const fs = new DetailsUtilsForceState(detail, this.options);
						const matchingMedia = fs.getMatchingMedia(
							detail,
							this.options.closeEsc,
						);
						if (!matchingMedia || matchingMedia.matches) {
							fs.toggle();
						}
					}
				}
			},
			false,
		);
	}

	isChildOfParent(target: ParentNode, parent: ParentNode) {
		while (target && target.parentNode) {
			if (target.parentNode === parent) {
				return true;
			}
			target = target.parentNode;
		}
		return false;
	}

	onClickoutToClose(detail: HTMLDetailsElement, event: Event) {
		const fs = new DetailsUtilsForceState(detail, this.options);
		const matchingMedia = fs.getMatchingMedia(
			detail,
			this.options.closeClickOutside,
		);
		if (matchingMedia && !matchingMedia.matches) {
			// Don’t close if has a media query but it doesn’t match current viewport size
			// useful for viewport navigation that must stay open (e.g. list of horizontal links)
			return;
		}

		const eventTarget = event.target;
		if (!eventTarget) return;
		if (!(eventTarget instanceof HTMLElement)) return;
		const isCloseButton = eventTarget.hasAttribute(
			this.attrs.closeClickOutsideButton,
		);
		if (
			(isCloseButton || !this.isChildOfParent(eventTarget, detail)) &&
			detail.open
		) {
			fs.triggerClickToClose();
		}
	}

	bindClickoutToClose(details: HTMLDetailsElement[]) {
		// Note: Scoped to document
		document.documentElement.addEventListener(
			"mousedown",
			(event) => {
				for (const detail of details) {
					this.onClickoutToClose(detail, event);
				}
			},
			false,
		);

		// Note: Scoped to this element only
		this.addEventListener(
			"keypress",
			(event) => {
				if (
					!(
						event.key === "Enter" ||
						event.key === " " ||
						event.key === "Spacebar"
					)
				)
					return;

				// enter, space
				for (const detail of details) {
					this.onClickoutToClose(detail, event);
				}
			},
			false,
		);
	}

	bindToggleDocumentClass(details: HTMLDetailsElement[]) {
		for (const detail of details) {
			detail.addEventListener("toggle", (event) => {
				if (this.toggleDocumentClassName === null)
					throw new Error("Missing this.toggleDocumentClassName");
				if (!event.target)
					throw new Error("Missing event.target for bindToggleDocumentClass");
				if (!("open" in event.target))
					throw new Error(
						"Element does not have 'open' attribute (is it a details element?)",
					);
				document.documentElement.classList.toggle(
					this.toggleDocumentClassName,
					// Typecast because I wanted a looser check, instead of checking for
					// the <details> element explicitly
					Boolean(event.target.open),
				);
			});
		}
	}
}

if (typeof window !== "undefined" && "customElements" in window) {
	window.customElements.define("details-utils", DetailsUtils);
}
