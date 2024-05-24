/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,mdoc,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			"josefin-sans": ['"Josefin Sans"'],
			mono: [
				"ui-monospace",
				"SFMono-Regular",
				"Menlo",
				"Monaco",
				"Consolas",
				"Liberation Mono",
				"Courier New",
				"monospace",
			],
		},
		extend: {},
		screens: {
			xs: "475px",
			...defaultTheme.screens,
		},
	},
	plugins: [require("flowbite-typography")],
};
