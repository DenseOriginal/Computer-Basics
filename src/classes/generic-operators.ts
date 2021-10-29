import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { InputNode, OutputNode } from "./node";

export abstract class GenericOperator implements Drawable {
  public inputs: InputNode[] = [];
  public outputs: OutputNode[] = [];
  public width: number;
  public height: number;
  public label?: string;

  private dragging: boolean = false;

  constructor(
    public pos: Vector,
    inputsN: number,
    outputsN: number,
    labelOrWidth: string | number = 50,
  ) {
    this.width = typeof labelOrWidth === 'string' ? textWidth(labelOrWidth) + 40 : labelOrWidth;
    this.label = typeof labelOrWidth === 'string' ? labelOrWidth : undefined;

    const most = Math.max(inputsN, outputsN);
    this.height = Math.max(most * 25, 50);

    // Generate input nodes and space evenly on the left side
    for (let i = 0; i < inputsN; i++) {
      this.inputs.push(new InputNode(createVector(
        -this.width / 1.7,
        (-this.height / 2 + (i * this.height / inputsN)) + this.height / inputsN / 2,
      ), pos));
    }

    // Generate output nodes and space evenly on the right side
    for (let i = 0; i < outputsN; i++) {
      this.outputs.push(new OutputNode(createVector(
        this.width / 1.7,
        (-this.height / 2 + (i * this.height / outputsN)) + this.height / outputsN / 2
      ), pos));
    }
  }

  public draw(): void {
    push();

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);

    this.customDraw();

    // If mouse is over the operator, draw a white border
    if (this.mouseOver()) {
      stroke('#f0ce26');
      strokeWeight(4);
      noFill();
      rect(this.pos.x, this.pos.y, this.width * 1.15, this.height * 1.15, 5, 5, 5, 5);
    }

    pop();

    this.logic();

    this.inputs.forEach(input => input.draw());
    this.outputs.forEach(output => output.draw());
  }

  protected customDraw(): void {
    if(this.label) {
      fill('#fff');
      textSize(14);
      text(this.label, this.pos.x, this.pos.y);
    }
  }

  public mouseOver(): boolean {
    return mouseX > this.pos.x - this.width / 2 &&
      mouseX < this.pos.x + this.width / 2 &&
      mouseY > this.pos.y - this.height / 2 &&
      mouseY < this.pos.y + this.height / 2;
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

  protected abstract logic(): void;
}