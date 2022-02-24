/// <reference path="../node_modules/@types/p5/global.d.ts"/>

import { AndGate } from './classes/and-gate';
import { Input } from './classes/input';
import { Clock } from './classes/clock';
import { CombinedOperators } from './classes/combined-operators';
import { GenericOperator } from './classes/generic-operators';
import { SavedCombinedOperator } from './classes/interfaces';
import { NotGate } from './classes/not-gate';
import { OrGate } from './classes/or-gate';
import { Output } from './classes/output';
import { PulseButton } from './classes/pulse-button';
import { saveCircuitInLocalStorage } from './save-load';

const operators: GenericOperator[] = [];
const savedCombinedOperator: SavedCombinedOperator = {};

(window as any).setup = () => {
  createCanvas(windowWidth, windowHeight);
};

(window as any).draw = () => {
  background(255);
  operators.forEach((cur) => cur.draw());
};

// Add event listener for dragend event on all list events with data-tool value
document.querySelectorAll('[data-tool]').forEach((cur) => {
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
type Tools = 'pulse' | 'clock' | 'input' | 'output' | 'andGate' | 'orGate' | 'notGate';
function createOperator(tool: Tools): void {
  let newOperator: GenericOperator | undefined;

  switch (tool) {
  case 'andGate':
    newOperator = new AndGate();
    break;
  case 'pulse':
    newOperator = new PulseButton();
    break;
  case 'clock':
    newOperator = new Clock();
    break;
  case 'output':
    newOperator = new Output();
    break;
  case 'input':
    newOperator = new Input();
    break;
  case 'notGate':
    newOperator = new NotGate();
    break;
  case 'orGate':
    newOperator = new OrGate();
    break;
  default:
    const exhaustiveCheck: never = tool;
    throw new Error(`Unhandled tool case: ${exhaustiveCheck}`);
  }

  newOperator.pos.set(createVector(mouseX, mouseY));

  operators.push(newOperator);
}

// Listen for when the 'Create Operator' is pressed
// Then combine all the current operators into one
document.getElementById('new-operator')?.addEventListener('click', () => {
  // Ask the user what it should be called
  const name = prompt('What will you call this new operator');
  if (!name) return alert('You can\'t create an operator without a name');

  // Copy all the current operators to the savedCombinedOperator object Under the user given name
  // Very important that we don't just write `savedCombinedOperator[name] = operator`, because then we only copy the reference
  // And then when we erase all the current operators, it will also erase all the saved onces
  savedCombinedOperator[name] = [];
  operators.forEach((op) => savedCombinedOperator[name].push(op));

  // Then erase the current operators
  operators.length = 0;

  // Save the operators to localStorage
  saveCircuitInLocalStorage(savedCombinedOperator[name], name);

  // Create the tool button in the UI
  const toolButton = document.createElement('li');
  toolButton.draggable = true;
  toolButton.innerText = name;

  // Insert the button before the spacer
  document.getElementById('insert-before-here')?.insertAdjacentElement('beforebegin', toolButton);

  // Setup ondragend handler
  toolButton.addEventListener('dragend', () => {
    const newOperator = new CombinedOperators(savedCombinedOperator[name], name);
    newOperator.pos.set(createVector(mouseX, mouseY));
    operators.push(newOperator);
  });
});

// Get the deletion zone element, and show it when the user is dragging an operator around
const deletionZone = document.getElementById('deletion-zone');

// Loop over all operators and find the first one that is clicked
// Then drag it to the mouse position
let draggingItem: GenericOperator | undefined;
(window as any).mousePressed = () => {
  const clicked = operators.find((cur) => cur.mouseOver());
  if (clicked) {
    clicked.dragStart();
    draggingItem = clicked;
  }
};

(window as any).mouseDragged = () => {
  // If there's an item being dragged, then call the drag() method on them
  if (draggingItem) {
    draggingItem.drag();

    // Show the deletion zone
    deletionZone?.classList.remove('hidden');
  }
};

(window as any).mouseReleased = () => {
  // When ever the mouse is released, call the dragEnd() method on the item
  // Wether or not we're actually dragging an item, using the optional chaining
  draggingItem?.dragEnd();

  // Hide the deletion zone, even if it wasn't show
  deletionZone?.classList.add('hidden');

  // If the user dropped the an operator in the deletionZone
  // Then destroy it
  if (draggingItem && mouseY < 100) {
    // Tell the operator to destroy all it's connections
    draggingItem.destroy();

    // Find an remove the operator from the array of operators
    const indexOfOperator = operators.findIndex((op) => op == draggingItem);
    operators.splice(indexOfOperator, 1);
  }

  draggingItem = undefined;
};
