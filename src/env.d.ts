/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// https://github.com/withastro/starlight/blob/d8afbc221c8975e7dfba916d244a3feaa7ab63e9/packages/starlight/global.d.ts#L3
declare let StarlightThemeProvider: {
	updatePickers(theme?: string): void;
};
