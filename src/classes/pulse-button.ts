import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

const buttonSize = 50;
const pulse = 30;

export class PulseButton extends GenericOperator {
  constructor(
    pos: Vector
  ) {
    super(pos, 0, 1);
    document.addEventListener('mousedown', () => this.mouseClicked())
  }

  override customDraw(): void {
    push();

    noStroke();
    fill('#db0000');
    circle(this.pos.x, this.pos.y, buttonSize * 0.7);

    // Draw a little '1' in the lower right corner
    textAlign(CENTER, CENTER);
    textSize(buttonSize * 0.3);
    fill('#fff');
    text('1', this.pos.x + buttonSize * 0.7 / 2, this.pos.y + buttonSize * 0.7 / 2);

    pop();
  }

  logic(): void { }

  private mouseClicked(): void {
    const distSq = (this.pos.x - mouseX) ** 2 + (this.pos.y - mouseY) ** 2;
    const dist = Math.sqrt(distSq);

    if(dist < buttonSize * 0.7 / 2) {
      this.outputs[0].setStatus(true);
      setTimeout(() => this.outputs[0].setStatus(false), pulse);
    }
  }
}