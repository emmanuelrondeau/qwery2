import { writable } from "svelte/store";

export type Theme = "auto" | "dark" | "light";

export const theme = writable("auto" as Theme);
export const selectedTheme = writable({
	value: "auto" as Theme,
	label: "Auto",
});
