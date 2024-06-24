/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// https://github.com/withastro/starlight/blob/d8afbc221c8975e7dfba916d244a3feaa7ab63e9/packages/starlight/global.d.ts#L3
declare var StarlightThemeProvider: {
	updatePickers(theme?: string): void;
};

declare module "*.mdx" {
	import type { MDXProps } from "mdx/types";
	import type { Toc } from "@stefanprobst/rehype-extract-toc";

	export const tableOfContents: Toc;
	export default function MDXContent(props: MDXProps): JSX.Element;
}
