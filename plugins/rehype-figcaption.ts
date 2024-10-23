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
				console.log(node);

				// @ts-expect-error - type mitigation
				const children = [...(node.children as RootContent[])];
				if (!children) return;

				// @ts-expect-error - type mitigation
				(node.children as RootContent[]) = [
					{
						type: "element",
						tagName: "p",
						properties: {
							className: `mx-auto text-center italic`,
						},
						// @ts-ignore - Don't know if it's complaining about something valid
						children: children,
					},
				];
			}
		}
	};
}
