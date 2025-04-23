<script lang="ts">
	import { Select } from "bits-ui";
	import Check from "phosphor-svelte/lib/Check";

	import { selectedTheme, theme } from "@/stores";
	import { createSelect, melt } from "@melt-ui/svelte";
	import { onMount } from "svelte";
	import { cubicOut } from "svelte/easing";
	import { scale } from "svelte/transition";

	interface Props {
		children?: import("svelte").Snippet;
	}

	const { children }: Props = $props();

	const themes: { value: string; label: string; icon?: Element | null }[] = [
		{ value: "light", label: "Light" },
		{ value: "dark", label: "Dark" },
		{ value: "auto", label: "Auto" },
	];

	let value = $state<string>("");
	const selectedLabel = $derived(
		value
			? themes.find((theme) => theme.value === value)?.label
			: "Select a theme",
	);

	onMount(() => {
		const tmpl: HTMLTemplateElement | null =
			document.querySelector("#theme-icons");
		if (tmpl) {
			for (const optionElement of themes) {
				optionElement.icon = tmpl.content.querySelector(
					`.${optionElement.value}`,
				);
				optionElement.icon?.setAttribute("width", "24px");
				optionElement.icon?.setAttribute("height", "24px");
			}
		}
	});
</script>

<Select.Root type="single" onValueChange={(v) => (value = v)} items={themes}>
	<Select.Trigger
		class="group flex items-center justify-between p-2 ring-violet-600 outline-none focus-visible:rounded focus-visible:ring-2 aria-expanded:text-violet-700 dark:ring-gray-50"
		aria-label="Select a theme"
	>
		{@render children?.()}
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 flex max-h-[var(--bits-select-content-available-height)] min-w-[var(--bits-select-anchor-width)] flex-col rounded border border-gray-700 bg-gray-50 p-2 px-1 py-3 shadow outline-hidden select-none focus:!ring-0 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 dark:bg-gray-800"
			sideOffset={10}
		>
			<!-- <Select.ScrollUpButton class="flex w-full items-center justify-center">
        <CaretDoubleUp class="size-3" />
      </Select.ScrollUpButton> -->
			<Select.Viewport class="p-1">
				{#each themes as theme, i (i + theme.value)}
					<Select.Item
						class={`group relative flex cursor-pointer items-center gap-x-2 rounded px-2 py-1 data-[disabled]:opacity-50 ${
							// selected
							// 	? "text-violet-600 dark:text-violet-400 focus:text-violet-700 dark:focus:text-violet-100 data-[highlighted]:text-violet-900 dark:data-[highlighted]:text-violet-100 data-[highlighted]:fill-violet-900 hover:fill-violet-900 fill-violet-600 dark:fill-violet-400 dark:hover:fill-violet-100 dark:data-[highlighted]:fill-violet-100" :
							"dark:data-highlighted:bg-gray-600 fill-gray-600 text-gray-600 hover:fill-gray-700 focus:text-gray-700 data-highlighted:fill-gray-700 data-highlighted:text-gray-900 dark:fill-gray-200 dark:text-gray-300 dark:hover:fill-gray-100 dark:focus:text-gray-100 dark:data-highlighted:fill-gray-100 dark:data-highlighted:text-gray-100"
						}`}
						value={theme.value}
						label={theme.label}
					>
						{#snippet children({ selected })}
							{@html theme.icon?.outerHTML}
							<span class="relative top-[.1em]">
								{theme.label}
							</span>
							{#if selected}
								<div class="ml-auto">
									<Check />
								</div>
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
			<!-- <Select.ScrollDownButton class="flex w-full items-center justify-center">
        <CaretDoubleDown class="size-3" />
      </Select.ScrollDownButton> -->
		</Select.Content>
	</Select.Portal>
</Select.Root>
