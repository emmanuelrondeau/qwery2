/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,mdoc,svelte,ts,tsx,vue}",
		"astro.config.mjs",
		"./plugins/**/*.{ts,mjs}"
	],
	darkMode: ["selector", '[data-theme="dark"]'],
	theme: {
		fontFamily: {
			"josefin-sans": [
				'"Josefin Sans"',
				"ui-sans-serif",
				"system-ui",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji",
			],
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
		extend: {
			aria: {
				current: 'current="true"',
			},
		},
		screens: {
			xs: "475px",
			...defaultTheme.screens,
		},
	},
	plugins: [
		require("flowbite-typography"),
		require("tailwind-scrollbar")({ nocompatible: true }),
	],
};
