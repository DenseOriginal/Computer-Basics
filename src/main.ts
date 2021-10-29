/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { AndGate } from "./classes/and-gate";
import { Button } from "./classes/button";
import { Clock } from "./classes/clock";
import { Drawable } from "./classes/interfaces";
import { NotGate } from "./classes/not-gate";
import { OrGate } from "./classes/or-gate";
import { Output } from "./classes/output";
import { PulseButton } from "./classes/pulse-button";

const things: Drawable[] = [];

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
}

(window as any).draw = () => {
	background(255);
	things.forEach(cur => cur.draw());
}

// Add event listener for dragend event on all list events with data-tool value
document.querySelectorAll('[data-tool]').forEach(cur => {
	cur.addEventListener('dragend', () => {
		const tool = cur.getAttribute('data-tool');
		createOperator(tool as Tools);
	});
});


type Tools = "button" | "pulse" | "clock" | "output" | "andGate" | "orGate" | "notGate";
function createOperator(tool: Tools): void {
	let newThing: Drawable | undefined;

	switch(tool) {
		case 'andGate':
			newThing = new AndGate(createVector(mouseX, mouseY));
			break;
		case 'button':
			newThing = new Button(createVector(mouseX, mouseY));
			break;
		case 'pulse':
			newThing = new PulseButton(createVector(mouseX, mouseY));
			break;
		case 'clock':
			newThing = new Clock(createVector(mouseX, mouseY));
			break;
		case 'output':
			newThing = new Output(createVector(mouseX, mouseY));
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
