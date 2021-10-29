import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

const buttonSize = 50;

export class Button extends GenericOperator {
  constructor(
    pos: Vector,
  ) {
    super(pos, 0, 1, buttonSize);
    document.addEventListener('click', () => this.mouseClicked())
  }

  customDraw() {
    push();

    rectMode(CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, buttonSize, buttonSize, 5, 5, 5, 5);

    fill('#db0000');
    circle(this.pos.x, this.pos.y, buttonSize * 0.7);

    pop();
  }

  logic(): void { }

  private mouseClicked(): void {
    const distSq = (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2;
    const dist = Math.sqrt(distSq);

    if(dist < buttonSize * 0.7 / 2) {
      this.outputs[0].flip();
    }
  }
}
