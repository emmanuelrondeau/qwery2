import type { ElementContent, Root, RootContent } from "hast";

export default function rehypeFigCaption() {
	return (tree: Root) => {
		let figureCount = 0;
		for (const element of tree.children) {
			figureCount = parseChildren(element, figureCount);
		}
	};

	function parseChildren(node: RootContent, figureCount: number) {
		// Iterate through all children recursively
		if (!("children" in node)) return figureCount;
		for (const element of node.children) {
			figureCount = parseChildren(element, figureCount);
		}

		// Retrieve figure element if it exists
		if (
			// @ts-expect-error - type doesn't exist
			!(node.type === "mdxJsxFlowElement" && node.name === "figure")
		) {
			return figureCount;
		}
		const figureElement = node as ElementContent;

		// Attempts to grab the element's children to scan for a figcaption
		// (Assumes only one exists)
		const children = "children" in figureElement ? figureElement.children : [];
		const figCaptionIndex = children.findLastIndex(
			(c) =>
				// @ts-expect-error - type doesn't exist
				c.type === "mdxJsxFlowElement" && c.name === "figcaption",
		);

		// Don't continue if there's no figure with figcaption element
		if (figCaptionIndex === -1) return figureCount;
		const figCaption = children[figCaptionIndex];
		figureCount++;

		// Start applying classes into figcaption for styling
		// @ts-expect-error - I'm in hell
		const classAttribute = figCaption.attributes?.find(
			// @ts-expect-error - I'm in hell
			(attr) => attr.name === "class",
		);
		const classToAdd = "mx-auto text-center italic";
		const classWidth = "max-w-[90%]";
		if (!classAttribute) {
			// @ts-expect-error - I'm in hell
			figCaption.attributes.push({
				type: "mdxJsxAttribute",
				name: "class",
				value: `${classToAdd} ${classWidth}`,
			});
		} else {
			// Filters for "max-w-", to allow any explicit declaration priority
			const newClass = classAttribute.value.includes("max-w-")
				? classToAdd
				: `${classToAdd} ${classWidth}`;
			classAttribute.value += ` ${newClass}`;
		}

		// Adds ID required for aria-labelledby
		const id = `fig-${figureCount}`;
		// @ts-expect-error - I hate this
		figCaption.attributes.push({
			type: "mdxJsxAttribute",
			name: "id",
			value: id,
		});

		// Blindly following WAI-ARIA's specific <figure> formatting
		// https://www.w3.org/WAI/tutorials/page-structure/content/#figures
		// @ts-expect-error - perhaps, this is hell
		figureElement.attributes.push(
			{
				type: "mdxJsxAttribute",
				name: "aria-labelledby",
				value: id,
			},
			{
				type: "mdxJsxAttribute",
				name: "role",
				value: "group",
			},
		);

		return figureCount;
	}
}
