import { writable } from "svelte/store";

export type Theme = "auto" | "dark" | "light";

export const theme = writable("auto" as Theme);
