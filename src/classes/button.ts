import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { OutputNode } from "./node";

const buttonSize = 50;

export class Button implements Drawable {
  public output: OutputNode;

  constructor(
    public pos: Vector
  ) {
    this.output = new OutputNode(pos.copy().add(createVector(buttonSize / 1.7, 0)));
    document.addEventListener('click', () => this.mouseClicked())
  }

  public draw(): void {
    push();

    rectMode(CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, buttonSize, buttonSize, 5, 5, 5, 5);

    fill('#db0000');
    circle(this.pos.x, this.pos.y, buttonSize * 0.7);

    pop();

    this.output.draw();
  }

  private mouseClicked(): void {
    const distSq = (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2;
    const dist = Math.sqrt(distSq);

    if(dist < buttonSize * 0.7 / 2) {
      this.output.flip();
    }
  }
}