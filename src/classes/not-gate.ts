import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { InputNode, OutputNode } from "./node";

export class NotGate implements Drawable {
  public inputA: InputNode;
  public output: OutputNode;
  private width: number;

  constructor(
    public pos: Vector,
    private height = 50,
  ) {
    this.width = textWidth('NOT') + 40;

    this.inputA = new InputNode(this.pos.copy().add(createVector(-this.width / 1.7, 0)));
    this.output = new OutputNode(pos.copy().add(createVector(this.width / 1.7, 0)));
  }

  public draw(): void {
    this.output.setStatus(!this.inputA.status);

    push();

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, this.width, this.height, 5, 5, 5, 5);

    fill('#fff');
    textSize(14);
    text('NOT', this.pos.x, this.pos.y);

    pop();

    this.inputA.draw();
    this.output.draw();
  }
}