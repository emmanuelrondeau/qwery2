// Mostly derived from https://github.com/withastro/docs/blob/main/eslint.config.mjs
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
	{
		ignores: [
			"**/dist",
			"**/node_modules",
			"**/.astro",
			"**/.github",
			"**/.changeset",
		],
	},

	// Astro
	...eslintPluginAstro.configs.recommended,

	// Set globals for Node scripts.
	{
		files: ["astro.config.*", "scripts/**"],
		languageOptions: {
			globals: globals.node,
		},
	},
);
