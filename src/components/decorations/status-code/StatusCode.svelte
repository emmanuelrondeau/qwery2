<script lang="ts">
	interface Props {
		sfxUrl: string;
	}

	const { sfxUrl }: Props = $props();

	function toggleAudio() {
		const buttonElement = document.querySelector(
			"button#status-code",
		) as HTMLButtonElement;
		const audioElement = document.querySelector(
			"audio#conet",
		) as HTMLAudioElement;

		if (buttonElement.ariaLabel === "Play") {
			audioElement.play();
			buttonElement.ariaLabel = "Pause";
			buttonElement.textContent = "204";
		} else {
			audioElement.pause();
			buttonElement.ariaLabel = "Play";
			buttonElement.textContent = "512";
		}
	}

	// const statusCode = document.getElementById("status-code");
	// if (!statusCode) throw new Error('document of ID "status-code" not found');
	// statusCode.textContent = "204512";
</script>

<p class="text-gray-500">
	Status code: <button
		class="font-mono"
		id="status-code"
		aria-label="Play"
		onclick={toggleAudio}>404</button
	>
</p>
<audio id="conet">
	<source src={sfxUrl} type="audio/ogg" />
</audio>
