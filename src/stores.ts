import { writable } from "svelte/store";

export const theme = writable("auto");
export const selectedTheme = writable({
	value: "auto",
	label: "Auto",
});
