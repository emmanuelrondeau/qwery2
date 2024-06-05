<script lang="ts">
	import { onMount } from "svelte";
	import { createSelect, melt } from "@melt-ui/svelte";
	import { fade } from "svelte/transition";

	import DarkMode from "../../assets/icons/DarkMode.svelte";
	import LightMode from "../../assets/icons/LightMode.svelte";
	import SystemDefault from "../../assets/icons/SystemDefault.svelte";

	const darkKey = "dark";
	const lightKey = "light";
	const options = [
		{ value: lightKey, icon: LightMode, label: "Light" },
		{ value: darkKey, icon: DarkMode, label: "Dark" },
		{ value: "system", icon: SystemDefault, label: "System" },
	];
	let currentIcon = options[0].icon;

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
	});

	onMount(() => {
		const enableLightMode = (store = true) => {
			document.documentElement.classList.remove("dark");
			currentIcon = options[0].icon;
			if (store) localStorage.setItem(themeKey, lightKey);
		};
		const enableDarkMode = (store = true) => {
			document.documentElement.classList.add("dark");
			currentIcon = options[1].icon;
			if (store) localStorage.setItem(themeKey, darkKey);
		};
		const disableTheme = (store = true) => {
			document.documentElement.classList.remove("dark");
			if (store) localStorage.removeItem(themeKey);
		};

		const changeThemeViaSystemPreference = () => {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				// Don't set localStorage for theme preference, to respect
				// future changes to prefers-color-scheme
				enableDarkMode(false);
			} else {
				console.log("b");
			}
		};

		const themeKey = "theme";
		let theme = localStorage.getItem(themeKey);
		if (theme === lightKey) enableLightMode();
		else if (theme === darkKey) enableDarkMode();
		else changeThemeViaSystemPreference();
	});
</script>

<div class="flex flex-col gap-1">
	<button
		class="flex items-center justify-between rounded p-2 aria-expanded:text-violet-700"
		use:melt={$trigger}
		aria-label="Open theme switcher"
	>
		<!-- {$selectedLabel || "System"} -->
		<svelte:component this={currentIcon} />
		<!-- <ChevronDown class="size-5" /> -->
	</button>
	{#if $open}
		<div
			class="z-40 flex flex-col rounded bg-white dark:bg-gray-800 p-2 shadow focus:!ring-0"
			use:melt={$menu}
			transition:fade={{ duration: 100 }}
		>
			{#each options as item}
				<div
					class="flex items-center relative cursor-pointer rounded px-2 py-1 gap-x-2 text-gray-600 dark:text-gray-300 fill-gray-600 dark:fill-gray-200  hover:bg-violet-50 dark:hover:bg-gray-700 focus:z-40 focus:text-violet-700 dark:focus:text-gray-100 hover:fill-violet-700 data-[highlighted]:fill-violet-700 dark:hover:fill-gray-100 dark:data-[highlighted]:fill-gray-100 data-[highlighted]:bg-violet-50 dark:data-[highlighted]:bg-gray-700 data-[highlighted]:text-violet-900 dark:data-[highlighted]:text-gray-100 data-[disabled]:opacity-50"
					use:melt={$option({ value: item.value, label: item.label })}
				>
					<svelte:component this={item.icon} />
					<span class="mt-1">{item.label}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
