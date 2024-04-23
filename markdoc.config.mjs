import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";
import { render } from "react-dom";

export default defineMarkdocConfig({
	tags: {
		abbr: {
			render: component("./src/components/articles/MarkdocAbbreviation.astro"),
		},
		callout: {
			render: component("./src/components/primitives/Callout.astro"),
			attributes: {
				// Markdoc requires type defs for each attribute.
				// These should mirror the `Props` type of the component
				// you are rendering.
				// See Markdoc's documentation on defining attributes
				// https://markdoc.dev/docs/attributes#defining-attributes
				type: {
					type: String,
					default: "Info",
					required: false,
					matches: ["Info" | "Warning" | "Caution"],
					errorLevel: "warning",
				},
				removeTypeText: {
					type: Boolean,
					required: false,
				}
			},
		},
		caption: {
			render: component("./src/components/articles/MarkdocFigureCaption.astro"),
			attributes: {
				captionClass: { type: String, required: false },
			}
		},
		dfn: {
			render: component("./src/components/articles/MarkdocDefinition.astro"),
		},
		div: {
			render: component("./src/components/articles/MarkdocDivider.astro"),
		},
		figure: {
			render: component("./src/components/articles/MarkdocFigure.astro"),
			attributes: {
				class: { type: String, required: false },
			}
		},
		image: {
			render: component("./src/components/articles/MarkdocImage.astro"),
			attributes: {
				src: { type: String, required: true},
				alt: { type: String, required: false },
				class: {type: String, required: false }
			},
			selfClosing: true
		},
		time: {
			render: component("./src/components/articles/MarkdocTime.astro"),
			attributes: {
				datetime: { type: String, required: true }
			}
		}
	},
});
