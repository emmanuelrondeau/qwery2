import type { Root } from "hast";
import { toString as hastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

export default function remarkReadingTime() {
	return (tree: Root, { data }: any) => {
		const textOnPage = hastToString(tree);
		const readingTime = getReadingTime(textOnPage);
		// readingTime.text will give us minutes read as a friendly string,
		// i.e. "3 min read"
		data.astro.frontmatter.minutesRead = Math.ceil(readingTime.minutes);
	};
}
