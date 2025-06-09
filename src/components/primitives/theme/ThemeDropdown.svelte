<script lang="ts">
	import { theme, type Theme } from "@/stores";

	// Using the Select instead of DropdownMenu because I didn't think it existed.
	// (I'm going to hope that this is still semantically-sane enough for screen readers)
	import { Select } from "bits-ui";
	import Check from "phosphor-svelte/lib/Check";
	import { onMount } from "svelte";
	import { get } from "svelte/store";

	interface Props {
		children?: import("svelte").Snippet;
	}

	const { children }: Props = $props();

	const themes: { value: Theme; label: string; icon?: Element | null }[] = [
		{ value: "light", label: "Light" },
		{ value: "dark", label: "Dark" },
		{ value: "auto", label: "Auto" },
	];

	let selectValue = $state<Theme>(get(theme));

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

<Select.Root
	type="single"
	bind:value={selectValue}
	onValueChange={(v) => {
		theme.set(v as Theme);
	}}
	items={themes}
>
	<Select.Trigger
		class="group font-montserrat ring-focus-outline aria-expanded:text-primary-700 flex items-center justify-between p-2 outline-hidden select-none focus-visible:rounded-lg focus-visible:ring-2 aria-expanded:ring-0"
		aria-label="Select a theme"
	>
		{@render children?.()}
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-base-neutral-300 bg-base-neutral-100 z-50 flex max-h-[var(--bits-select-content-available-height)] w-32 min-w-[var(--bits-select-anchor-width)] flex-col rounded p-1 shadow outline-hidden select-none focus:!ring-0 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
		>
			<!-- <Select.ScrollUpButton class="flex w-full items-center justify-center">
        <CaretDoubleUp class="size-3" />
      </Select.ScrollUpButton> -->
			<Select.Viewport class="p-1">
				{#each themes as theme, i (i + theme.value)}
					<Select.Item
						class={[
							"group relative flex cursor-pointer items-center gap-x-2 rounded p-1.5",
							// Light styling
							"data-selected:fill-primary-600 data-selected:text-primary-600 data-selected:hover:fill-primary-900 data-selected:focus:text-primary-700 data-selected:data-highlighted:bg-primary-100 data-selected:data-highlighted:fill-primary-900 data-selected:data-highlighted:text-primary-900 fill-gray-600 text-gray-600 hover:fill-gray-700 focus:text-gray-700 data-disabled:opacity-50 data-highlighted:bg-gray-200/80 data-highlighted:fill-gray-700 data-highlighted:text-gray-900",
							// Dark styling
							"dark:data-selected:fill-primary-400 dark:data-selected:text-primary-400 dark:hover:data-selected:fill-primary-100 data-selected:dark:focus:text-primary-100 dark:data-highlighted:data-selected:bg-primary-400/25 dark:data-highlighted:data-selected:fill-primary-100 dark:data-selected:data-highlighted:text-primary-100 dark:fill-gray-200 dark:text-gray-300 dark:hover:fill-gray-100 dark:focus:text-gray-100 dark:data-highlighted:bg-gray-600/50 dark:data-highlighted:fill-gray-100 dark:data-highlighted:text-gray-100",
						]}
						value={theme.value}
						label={theme.label}
					>
						{#snippet children({ selected })}
							{@html theme.icon?.outerHTML}
							<span class="font-medium">
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
