/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { AndGate } from "./classes/and-gate";
import { Button } from "./classes/button";
import { Drawable } from "./classes/interfaces";
import { InputNode } from "./classes/node";
import { NotGate } from "./classes/not-gate";
import { OrGate } from "./classes/or-gate";

const things: Drawable[] = [];

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
}

(window as any).draw = () => {
	background(255);
	things.forEach(cur => cur.draw());
}

(window as any).keyPressed = () => {
	let newThing: Drawable | undefined;

	switch(key) {
		case 'a':
			newThing = new AndGate(createVector(mouseX, mouseY));
			break;
		case 'b':
			newThing = new Button(createVector(mouseX, mouseY));
			break;
		case 'n':
			newThing = new NotGate(createVector(mouseX, mouseY));
			break;
		case 'o':
			newThing = new OrGate(createVector(mouseX, mouseY));
			break;
		case 'k':
			newThing = new InputNode(createVector(mouseX, mouseY));
			break;
		case 'r':
			things.length = 0;
			break;
	}

	if(newThing) things.push(newThing);
}