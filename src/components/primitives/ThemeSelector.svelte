<script lang="ts">
	import { createSelect, melt } from "@melt-ui/svelte";
	import { selectedTheme, theme } from "../../stores";
	import { onMount } from "svelte";

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
		selected: selectedTheme
	});

	onMount(() => {
		const tmpl: HTMLTemplateElement | null =
			document.querySelector(`#theme-icons`);
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
			// Totally won't bite me in the ass, if we need to localize to French.
			// (it will)
			theme.set(value.toLowerCase());
		});
	});
</script>

<div class="flex flex-col gap-1">
	<button
		class="flex items-center justify-between rounded p-2 aria-expanded:text-violet-700 outline-none focus-visible:ring-2 ring-violet-600 dark:ring-gray-50"
		use:melt={$trigger}
		aria-label="Open theme switcher"
	>
		<slot />
	</button>
	{#if $open}
		<div
			class="z-40 flex flex-col rounded bg-gray-50 dark:bg-gray-800 p-2 shadow focus:!ring-0"
			use:melt={$menu}
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
								? "group-hover:bg-violet-300 dark:group-hover:bg-violet-700 group-data-[highlighted]:bg-violet-100 dark:group-data-[highlighted]:bg-violet-400 dark:group-data-[highlighted]:bg-opacity-25"
								: "group-hover:bg-gray-200 dark:group-hover:bg-gray-700 group-data-[highlighted]:bg-gray-200 dark:group-data-[highlighted]:bg-gray-700"
						}`}
					/>
					{@html item.icon?.outerHTML}
					<span class="mt-1">{item.label}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
