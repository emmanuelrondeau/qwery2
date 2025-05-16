<script lang="ts">
	import Rainbow from "./flags/Rainbow.svelte";
	import Transgender from "./flags/Transgender.svelte";
	import GayMen from "./flags/GayMen.svelte";
	import Lesbian from "./flags/Lesbian.svelte";
	import NonBinary from "./flags/NonBinary.svelte";
	import Genderfluid from "./flags/Genderfluid.svelte";
	import Genderqueer from "./flags/Genderqueer.svelte";
	import Asexual from "./flags/Asexual.svelte";
	import Bisexual from "./flags/Bisexual.svelte";
	import Polysexual from "./flags/Polysexual.svelte";
	import Pansexual from "./flags/Pansexual.svelte";
	import Aromantic from "./flags/Aromantic.svelte";
	import Intersex from "./flags/Intersex.svelte";
	import Borga from "./flags/Borga.svelte";
	import Polyamorous from "./flags/Polyamorous.svelte";

	type Stripes =
		// General
		| "rainbow"
		// Gender
		| "genderfluid"
		| "genderqueer"
		| "nonbinary"
		| "transgender"
		// Sexuality
		| "asexual"
		| "bisexual"
		| "gay-men"
		| "lesbian"
		| "pansexual"
		| "polysexual"
		// Romantic & misc.
		| "aroace"
		| "aromantic"
		| "polyamorous"
		| "intersex"
		// Borga :3
		| "borga";

	interface Props {
		children?: import("svelte").Snippet;
		class?: string;
		type: Stripes;
	}

	const { class: className, type }: Props = $props();

	const flags: {
		type: Stripes;
		name: string;
		component: any;
	}[] = [
		// General
		{ type: "rainbow", name: "Rainbow", component: Rainbow },
		// Gender
		{ type: "genderfluid", name: "Genderfluid", component: Genderfluid },
		{ type: "genderqueer", name: "Genderqueer", component: Genderqueer },
		{ type: "nonbinary", name: "Nonbinary", component: NonBinary },
		{ type: "transgender", name: "Transgender", component: Transgender },
		// Sexuality
		{ type: "asexual", name: "Ace", component: Asexual },
		{ type: "bisexual", name: "Ace", component: Bisexual },
		{ type: "gay-men", name: "Gay men", component: GayMen },
		{ type: "lesbian", name: "Lesbian", component: Lesbian },
		{ type: "pansexual", name: "Ace", component: Pansexual },
		{ type: "polysexual", name: "Ace", component: Polysexual },
		// Romantic & misc.
		{ type: "aromantic", name: "Aromantic", component: Aromantic },
		{ type: "asexual", name: "Ace", component: Asexual },
		{ type: "polyamorous", name: "Polyam", component: Polyamorous },
		{ type: "intersex", name: "Intersex", component: Intersex },
		// Borga
		{ type: "borga", name: "Borga", component: Borga },
	];

	const foundDefaultFlag = flags.find((s) => s.type === type);
	if (!foundDefaultFlag)
		throw new Error("No stripe of type found", { cause: type });

	let data = $state(foundDefaultFlag);

	/**
	 * The maximum is exclusive and the minimum is inclusive
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	 * @param min
	 * @param max
	 */
	function getRandomInt(min: number, max: number) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); //
	}
</script>

<button
	aria-label={`${data.name} flag sticker`}
	class={[
		// Base stuff, overflow-clip needed especially to keep sticker contents
		// rounded like the sticker
		"pointer-events-auto absolute flex h-[106px] w-[106px] items-center justify-center overflow-clip rounded-full bg-gray-200",
		// Shaded bottom part of sticker, don't remember if pointer-events-none is important
		"before:pointer-events-none before:absolute before:inset-0 before:top-auto before:h-[53px] before:items-end before:rounded-b-full before:bg-gray-300 before:content-['']",
		// Zoom-in, applying motion-safe assuming prefers-reduced-motion generally
		// refers to reducing translating and scaling effects
		"hover:scale-105 focus-visible:scale-105 motion-safe:transition-transform",
		// Active state, zooming back in by resetting our scale back to baseline.
		// "focus-visible:active:" doesn't work on Firefox mouse clicks.
		// These styles would need to be JS to make space-bar work in Firefox
		// for the scale animations, for some reason
		"focus:active:scale-100 focus:active:duration-20",
		className,
	]}
	onclick={() => {
		const flagBag = flags.filter((f) => f.type !== data.type);
		const newFlag = flagBag[getRandomInt(0, flagBag.length)];
		data = newFlag;
	}}
>
	<div class="z-10 flex h-24 w-24 flex-col overflow-clip rounded-full">
		<data.component />
	</div>
</button>
