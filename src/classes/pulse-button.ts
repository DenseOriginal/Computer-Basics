import { Vector } from "p5";
import { Drawable } from "./interfaces";
import { OutputNode } from "./node";
import { Wire } from "./wire";

const buttonSize = 50;
const pulse = 30;

export class PulseButton implements Drawable {
  public output: OutputNode;

  constructor(
    public pos: Vector
  ) {
    this.output = new OutputNode(pos.copy().add(createVector(buttonSize / 1.7, 0)));
    document.addEventListener('mousedown', () => this.mouseClicked())
  }

  public draw(): void {
    push();

    rectMode(CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, buttonSize, buttonSize, 5, 5, 5, 5);

    fill('#db0000');
    circle(this.pos.x, this.pos.y, buttonSize * 0.7);

    // Draw a little '1' in the lower right corner
    textAlign(CENTER, CENTER);
    textSize(buttonSize * 0.3);
    fill('#fff');
    text('1', this.pos.x + buttonSize * 0.7 / 2, this.pos.y + buttonSize * 0.7 / 2);

    pop();

    this.output.draw();
  }

  private mouseClicked(): void {
    const distSq = (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2;
    const dist = Math.sqrt(distSq);

    if(dist < buttonSize * 0.7 / 2) {
      this.output.setStatus(true);
      setTimeout(() => this.output.setStatus(false), pulse);
    }
  }
}