<script lang="ts">
import { createSelect, melt } from "@melt-ui/svelte";
import { onMount } from "svelte";
import { cubicOut } from "svelte/easing";
import { scale } from "svelte/transition";
import { selectedTheme, theme } from "../../stores";

const options: { value: string; label: string; icon?: Element | null }[] = [
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
	{ value: "auto", label: "Auto" },
];

const {
	elements: { trigger, menu, option },
	states: { selectedLabel, open },
	helpers: { isSelected },
} = createSelect<string>({
	forceVisible: true,
	preventScroll: false,
	positioning: {
		placement: "bottom",
		fitViewport: true,
		// sameWidth: true,
		strategy: "absolute",
	},
	selected: selectedTheme,
});

onMount(() => {
	const tmpl: HTMLTemplateElement | null =
		document.querySelector("#theme-icons");
	if (tmpl) {
		for (const optionElement of options) {
			optionElement.icon = tmpl.content.querySelector(
				`.${optionElement.value}`,
			);
			optionElement.icon?.setAttribute("width", "24px");
			optionElement.icon?.setAttribute("height", "24px");
		}
	}

	selectedLabel.subscribe((value) => {
		// Totally won't bite me in the ass, if we need to localize to
		// French. (it probably will)
		theme.set(value.toLowerCase());
	});
});

// Code copied from link; is unlicensed, but is probably good to copy anyway
// https://svelte.dev/repl/de8970d53ce040159aba167c0a4af6ef?version=3.2.2
function fadeScale(
	node: Element,
	{ delay = 0, duration = 200, easing = cubicOut, baseScale = 0 },
) {
	const o = +getComputedStyle(node).opacity;
	const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
	const s = m ? Number(m[1]) : 1;
	const is = 1 - baseScale;

	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = easing(t);
			return `opacity: ${eased * o}; transform: scale(${eased * s * is + baseScale})`;
		},
	};
}
</script>

<div class="flex flex-col gap-1">
	<button
		class="group flex items-center justify-between rounded p-2 aria-expanded:text-violet-700 outline-none focus-visible:ring-2 ring-violet-600 dark:ring-gray-50"
		use:melt={$trigger}
		aria-label="Open theme switcher"
	>
		<slot />
	</button>
	{#if $open}
		<div
			class="z-40 flex flex-col rounded bg-gray-50 dark:bg-gray-800 p-2 shadow focus:!ring-0"
			use:melt={$menu}
			transition:fadeScale={{ duration: 75, baseScale: 0.9 }}
		>
			{#each options as item}
				<div
					class={`group flex items-center relative cursor-pointer rounded px-2 py-1 gap-x-2 data-[disabled]:opacity-50 ${
						$isSelected(item.value)
							? "text-violet-600 dark:text-violet-400 focus:text-violet-700 dark:focus:text-violet-100 data-[highlighted]:text-violet-900 dark:data-[highlighted]:text-violet-100 data-[highlighted]:fill-violet-900 hover:fill-violet-900 fill-violet-600 dark:fill-violet-400 dark:hover:fill-violet-100 dark:data-[highlighted]:fill-violet-100"
							: "text-gray-600 dark:text-gray-300 focus:text-gray-700 dark:focus:text-gray-100 data-[highlighted]:text-gray-900 dark:data-[highlighted]:text-gray-100 data-[highlighted]:fill-gray-700 hover:fill-gray-700 fill-gray-600 dark:fill-gray-200 dark:hover:fill-gray-100 dark:data-[highlighted]:fill-gray-100"
					}`}
					use:melt={$option({ value: item.value, label: item.label })}
				>
					<div
						class={`-z-10 absolute top-0 bottom-0 left-0 right-0 rounded ${
							$isSelected(item.value)
								? "group-hover:bg-violet-300 dark:group-hover:bg-violet-400/25 group-data-[highlighted]:bg-violet-100 dark:group-data-[highlighted]:bg-violet-400/25 dark:group-data-[highlighted]:bg-opacity-25"
								: "group-hover:bg-gray-200 dark:group-hover:bg-gray-700 group-data-[highlighted]:bg-gray-200 dark:group-data-[highlighted]:bg-gray-700"
						}`}
					></div>
					{@html item.icon?.outerHTML}
					<span class="mt-1">{item.label}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
