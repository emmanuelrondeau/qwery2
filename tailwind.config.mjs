/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,mdoc,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			"josefin-sans": ['"Josefin Sans"'],
		},
		extend: {},
		screens: {
			xs: "475px",
			...defaultTheme.screens,
		},
	},
	plugins: [require("flowbite-typography")],
};
