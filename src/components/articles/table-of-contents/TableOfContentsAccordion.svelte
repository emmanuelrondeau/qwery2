<script lang="ts">
	import { Accordion } from "bits-ui";
	import CaretDown from "phosphor-svelte/lib/CaretDown";

	interface Props {
		class?: string;
		children?: import("svelte").Snippet;
		triggerChildren?: import("svelte").Snippet;
	}

	const { children, class: className }: Props = $props();
</script>

<Accordion.Root type="single" class={className}>
	<Accordion.Item value="toc">
		<Accordion.Header>
			<Accordion.Trigger
				class="flex w-full items-center justify-between rounded py-2 pr-1 pl-3 ring-violet-600 outline-hidden focus-visible:ring-2 dark:ring-gray-50 [&[data-state=open]>span>svg]:rotate-180"
			>
				<h2
					role="presentation"
					class="relative top-[.1em] !m-0 text-lg font-semibold"
				>
					Table of Contents
				</h2>
				<span
					class="hover:bg-dark-10 inline-flex size-8 items-center justify-center rounded-[7px] bg-transparent"
				>
					<CaretDown class="size-[18px] transition-transform duration-200" />
				</span>
			</Accordion.Trigger>
		</Accordion.Header>
		<Accordion.Content
			class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-clip"
		>
			{@render children?.()}
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
