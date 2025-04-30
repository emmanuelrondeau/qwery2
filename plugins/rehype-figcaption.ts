import type { Root, RootContent } from "hast";

export default function rehypeFigCaption() {
	return (tree: Root) => {
		for (const element of tree.children) {
			parseChildren(element);
		}
	};

	function parseChildren(node: RootContent) {
		if (!("children" in node)) return;

		for (let index = 0; index < node.children.length; index++) {
			const element = node.children[index];
			parseChildren(element);

			// @ts-expect-error - type doesn't exist
			if (!(node.type === "mdxJsxFlowElement" && node.name === "figure")) {
				continue;
			}

			let figCaption = undefined;
			let figCaptionIndex = 0;

			// @ts-expect-error - type mitigation
			const children = node.children as RootContent[];

			for (let childIndex = 0; childIndex < children.length; childIndex++) {
				const node = children[childIndex];
				if (
					// @ts-expect-error - type doesn't exist
					!(node.type === "mdxJsxFlowElement" && node.name === "figcaption")
				) {
					continue;
				}
				figCaption = node;
				figCaptionIndex = childIndex;

				// @ts-expect-error - I'm in hell
				const classAttribute = node.attributes.find(
					// @ts-expect-error - I'm in hell
					(attr) => attr.name === "class",
				);
				const classToAdd = "mx-auto text-center italic max-w-[90%]";
				if (!classAttribute) {
					// @ts-expect-error - I'm in hell
					node.attributes.push({
						type: "mdxJsxAttribute",
						name: "class",
						value: classToAdd,
					});
				} else {
					classAttribute.value += ` ${classToAdd}`;
				}

				// @ts-expect-error - I hate this
				node.attributes.push({
					type: "mdxJsxAttribute",
					name: "id",
					value: `fig-${index}-${figCaptionIndex}`,
				});
			}

			if (figCaption) {
				// Blindly following WAI-ARIA's specific <figure> formatting
				// https://www.w3.org/WAI/tutorials/page-structure/content/#figures

				// @ts-expect-error - im in hell
				node.attributes.push(
					{
						type: "mdxJsxAttribute",
						name: "role",
						value: "group",
					},
					{
						type: "mdxJsxAttribute",
						name: "aria-labelledby",
						value: `fig-${index}-${figCaptionIndex}`,
					},
				);
			}
		}
	}
}
