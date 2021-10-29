/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { AndGate } from "./classes/and-gate";
import { Button } from "./classes/button";
import { Drawable } from "./classes/interfaces";
import { NotGate } from "./classes/not-gate";
import { OrGate } from "./classes/or-gate";

const things: Drawable[] = [];

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
	document.querySelector('canvas')?.addEventListener('click', () => mousePressed());
}

(window as any).draw = () => {
	background(255);
	things.forEach(cur => cur.draw());
}

function mousePressed(): void {
	let newThing: Drawable | undefined;
	const tool = (document.getElementById('tool-selection') as HTMLInputElement).value;

	switch(tool) {
		case 'andGate':
			newThing = new AndGate(createVector(mouseX, mouseY));
			break;
		case 'button':
			newThing = new Button(createVector(mouseX, mouseY));
			break;
		case 'notGate':
			newThing = new NotGate(createVector(mouseX, mouseY));
			break;
		case 'orGate':
			newThing = new OrGate(createVector(mouseX, mouseY));
			break;
	}

	if(newThing) things.push(newThing);
}