import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { InputNode, OutputNode } from "./node";

export abstract class GenericOperator implements Drawable {
  public inputA: InputNode;
  public inputB: InputNode;
  public output: OutputNode;
  private width: number;

  constructor(
    public pos: Vector,
    public label: string,
    private height = 50,
  ) {
    this.width = textWidth(label) + 40;

    this.inputA = new InputNode(this.pos.copy().add(createVector(-this.width / 1.7, -height * 0.3)));
    this.inputB = new InputNode(this.pos.copy().add(createVector(-this.width / 1.7, +height * 0.3)));

    this.output = new OutputNode(pos.copy().add(createVector(this.width / 1.7, 0)));
  }

  public draw(): void {
    this.logic();

    push();

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);

    fill('#fff');
    textSize(14);
    text(this.label, this.pos.x, this.pos.y);

    pop();

    this.inputA.draw();
    this.inputB.draw();
    this.output.draw();
  }

  protected abstract logic(): void;
}