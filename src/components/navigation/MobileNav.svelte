<script lang="ts">
	import { Popover } from "bits-ui";

	// Disables scrolling, without colliding with something that I forgot
	let myOpen = $state(false);
	function getOpen() {
		return myOpen;
	}
	function setOpen(newOpen: boolean) {
		myOpen = newOpen;
		if (myOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}
</script>

<Popover.Root bind:open={getOpen, setOpen}>
	<Popover.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class="group ring-focus-outline p-2 text-base outline-hidden select-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-offset-0 md:hidden [&_svg]:size-7"
			>
				<span class="sr-only">
					Toggle menu
					<noscript>Requires JavaScript</noscript>
				</span>
				<slot />
			</button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			class="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 h-(--bits-popover-content-available-height) w-(--bits-popover-content-available-width) origin-(--bits-popover-content-transform-origin)"
			align="start"
			side="bottom"
			alignOffset={-16}
			sideOffset={14}
			trapFocus={true}
		>
			<div
				class="mt-2 h-(--bits-popover-content-available-height) max-h-none w-(--bits-popover-content-available-width) max-w-none"
			>
				<div class="flex flex-col gap-2 px-4">
					<slot name="navigation" />
				</div>
			</div>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
