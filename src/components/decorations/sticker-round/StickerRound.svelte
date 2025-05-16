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

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	function getRandomInt(min: number, max: number) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
	}
</script>

<button
	aria-label={`${data.name} flag sticker`}
	class={[
		"pointer-events-auto absolute flex h-[106px] w-[106px] items-center justify-center rounded-full rounded-b-full bg-gray-200 before:pointer-events-none before:absolute before:inset-0 before:top-auto before:h-[53px] before:items-end before:rounded-b-full before:bg-gray-300 before:content-['']",
		"overflow-clip hover:scale-105 focus-visible:scale-105 active:scale-100 motion-safe:transition-transform",
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
