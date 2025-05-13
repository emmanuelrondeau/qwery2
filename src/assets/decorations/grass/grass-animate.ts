function randomNumber(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export class GrassAnimate extends HTMLElement {
	constructor() {
		super();

		const time = randomNumber(3, 5);

		const rotateLeftMin = -5;
		const rotateLeftMax = -3;
		const rotateRightMin = 5;
		const rotateRightMax = 10;

		const rotateLeft = randomNumber(rotateLeftMin, rotateLeftMax);
		const rotateRight = randomNumber(rotateRightMin, rotateRightMax);

		const isFlipped = this.getAttribute("data-flipped");
		console.log(isFlipped);

		this.style.setProperty("--grass-animation-time", `${time}s`);
		this.style.setProperty(
			"--grass-rotate-left",
			`${!isFlipped ? rotateLeft : rotateRight}deg`,
		);
		this.style.setProperty(
			"--grass-rotate-right",
			`${!isFlipped ? rotateRight : rotateLeft}deg`,
		);
	}
}

customElements.define("grass-animate", GrassAnimate);
