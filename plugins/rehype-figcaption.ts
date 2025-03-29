import type { Root, RootContent } from "hast";

export default function rehypeFigCaption() {
	return function (tree: Root) {
		for (const node of tree.children) {
			// @ts-expect-error - type doesn't exist
			if (!(node.type == "mdxJsxFlowElement" && node.name == "figure")) {
				continue;
			}

			// @ts-expect-error - type mitigation
			const children = node.children as RootContent[];

			for (const node of children) {
				// @ts-expect-error - type doesn't exist
				if (!(node.type == "mdxJsxFlowElement" && node.name == "figcaption")) {
					continue;
				}

				// @ts-expect-error - I'm in hell
				const classAttribute = node.attributes.find(
					// @ts-expect-error - I'm in hell
					(attr) => attr.name == "class",
				);
				const classToAdd = "mx-auto text-center italic";
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
			}
		}
	};
}
