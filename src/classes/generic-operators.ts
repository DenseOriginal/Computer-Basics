import { Vector } from 'p5';
import { getRandID } from '../helpers';
import { Drawable, HasID } from './interfaces';
import { InputNode, OutputNode } from './node';

// Generic class for creating operators
// This parent class has functionality for creating the input/output nodes
// Aswell as other important features that is required in every operator such as:
//   Drawing itself and nodes
//   Checking if the mouse is hovering over
//   Draggin and dropping
//   Destorying this operator
//
// This class is an abstract class, meaning that you cannot create an instance of this class
// You can only extend this class, this is because every operator needs to have different logic
// Every child operator can also implement it's own draw method by overriding the customDraw() method
// By default the customDraw() method just draws the label, if the operator has one.
export abstract class GenericOperator implements Drawable, HasID {
  public inputs: InputNode[] = [];
  public outputs: OutputNode[] = [];
  public width: number;
  public height: number;
  public label?: string;

  private dragging: boolean = false;

  public pos: Vector = createVector();

  private _id = getRandID();
  public get id() { return this._id; } // eslint-disable-line no-underscore-dangle
  public setId(id: string) { this._id = id; } // eslint-disable-line no-underscore-dangle

  constructor(
    inputsN: number,
    outputsN: number,
    labelOrWidth: string | number = 50,
  ) {
    // Calculate the width and label
    // Depending on what type labelOrWidth is
    this.width = typeof labelOrWidth === 'string' ? textWidth(labelOrWidth) + 40 : labelOrWidth;
    this.label = typeof labelOrWidth === 'string' ? labelOrWidth : undefined;

    // Calculate the height of this operator
    // For every node give it 25 pixels of space
    // If there's 1 node or less, then just set the height as 50 pixels
    const most = Math.max(inputsN, outputsN);
    this.height = Math.max(most * 25, 50);

    // Generate input nodes and space evenly on the left side
    for (let i = 0; i < inputsN; i++) {
      this.inputs.push(new InputNode(createVector(
        -(this.width / 2) - 5,
        ((-this.height / 2) + (i * this.height / inputsN)) + (this.height / inputsN / 2),
      ), this));
    }

    // Generate output nodes and space evenly on the right side
    for (let i = 0; i < outputsN; i++) {
      this.outputs.push(new OutputNode(createVector(
        (this.width / 2) + 5,
        ((-this.height / 2) + (i * this.height / outputsN)) + (this.height / outputsN / 2),
      ), this));
    }
  }

  public draw(): void {
    push();

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Draw the darkgrey background
    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);

    this.customDraw();

    // If mouse is over the operator, draw a white border
    if (this.mouseOver()) {
      stroke('#95d8ff');
      strokeWeight(3);
      noFill();
      rect(this.pos.x, this.pos.y, this.width * 1.15, this.height * 1.15, 5, 5, 5, 5);
    }

    pop();

    this.logic();

    // Draw all the nodes attached to this operator
    this.inputs.forEach((input) => input.draw());
    this.outputs.forEach((output) => output.draw());
  }

  protected customDraw(): void {
    // This method just draws the label of the operator by default
    // Child classes can overwrite this method and implement their own draw
    if (this.label) {
      fill('#fff');
      textSize(14);
      text(this.label, this.pos.x, this.pos.y);
    }
  }

  public mouseOver(): boolean {
    return mouseX > this.pos.x - (this.width / 2)
      && mouseX < this.pos.x + (this.width / 2)
      && mouseY > this.pos.y - (this.height / 2)
      && mouseY < this.pos.y + (this.height / 2);
  }

  public dragStart(): void {
    this.dragging = true;
  }

  public drag(): void {
    if (this.dragging) {
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }

  public dragEnd(): void {
    this.dragging = false;
  }

  public destroy(): void {
    // This method will tell all nodes to destroy all wires
    // So that no other operators are connected to this
    this.inputs.forEach((cur) => cur.destroy());
    this.outputs.forEach((cur) => cur.destroy());
  }

  // Every child class needs to write it's own logic method
  abstract logic(): void;
}
