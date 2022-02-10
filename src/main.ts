/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { AndGate } from "./classes/and-gate";
import { Button } from "./classes/button";
import { Clock } from "./classes/clock";
import { GenericOperator } from "./classes/generic-operators";
import { NotGate } from "./classes/not-gate";
import { OrGate } from "./classes/or-gate";
import { Output } from "./classes/output";
import { PulseButton } from "./classes/pulse-button";

const operators: GenericOperator[] = [];

(window as any).setup = () => {
	createCanvas(windowWidth, windowHeight);
}

(window as any).draw = () => {
	background(255);
	operators.forEach(cur => cur.draw());
}

// Add event listener for dragend event on all list events with data-tool value
document.querySelectorAll('[data-tool]').forEach(cur => {
	cur.addEventListener('dragend', () => {
		// When an HTML Element is dragged and then dropped
		// Then find out what tool it is, and create a new tool
		const tool = cur.getAttribute('data-tool');
		createOperator(tool as Tools);
	});
});


// Helper for creating a new operator on the screen
// It instantiates a new class corosponding to the tool that was passed in
// And then it appends the newly created operator to the operators array
type Tools = "button" | "pulse" | "clock" | "output" | "andGate" | "orGate" | "notGate";
function createOperator(tool: Tools): void {
	let newOperator: GenericOperator | undefined;

	switch(tool) {
		case 'andGate':
			newOperator = new AndGate(createVector(mouseX, mouseY));
			break;
		case 'button':
			newOperator = new Button(createVector(mouseX, mouseY));
			break;
		case 'pulse':
			newOperator = new PulseButton(createVector(mouseX, mouseY));
			break;
		case 'clock':
			newOperator = new Clock(createVector(mouseX, mouseY));
			break;
		case 'output':
			newOperator = new Output(createVector(mouseX, mouseY));
			break;
		case 'notGate':
			newOperator = new NotGate(createVector(mouseX, mouseY));
			break;
		case 'orGate':
			newOperator = new OrGate(createVector(mouseX, mouseY));
			break;
		default:
			const exhaustiveCheck: never = tool;
      throw new Error(`Unhandled tool case: ${exhaustiveCheck}`);
	}

	if(newOperator) operators.push(newOperator);
}

// Loop over all operators and find the first one that is clicked
// Then drag it to the mouse position
let draggingItem: GenericOperator | undefined;

(window as any).mousePressed = () => {
	const clicked = operators.find(cur => cur.mouseOver());
	if(clicked) {
		clicked.dragStart();
		draggingItem = clicked;
		return;
	}
}

(window as any).mouseDragged = () => {
	// If there's an item being dragged, then call the drag() method on them
	if(draggingItem) {
		draggingItem.drag();
	}
};

(window as any).mouseReleased = () => {
	// When ever the mouse is released, call the dragEnd() method on the item
	// Wether or not we're actually dragging an item, using the optional chaining
	draggingItem?.dragEnd();
	draggingItem = undefined;
}