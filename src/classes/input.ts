import { Vector } from 'p5';
import { GenericOperator } from './generic-operators';

const buttonSize = 50;

export class Input extends GenericOperator {
  public state: boolean = false;

  constructor(
    pos: Vector,
  ) {
    super(pos, 0, 1, buttonSize);
    document.addEventListener('click', () => this.mouseClicked());
  }

  override customDraw() {
    push();

    rectMode(CENTER);

    noStroke();
    fill('#383838');
    rect(this.pos.x, this.pos.y, buttonSize, buttonSize, 5, 5, 5, 5);

    fill('#db0000');
    circle(this.pos.x, this.pos.y, buttonSize * 0.7);

    pop();
  }

  logic(): void {
    this.outputs[0].setStatus(this.state);
  }

  private mouseClicked(): void {
    const distSq = ((this.pos.x - mouseX) ** 2) + ((this.pos.y - mouseY) ** 2);
    const dist = Math.sqrt(distSq);

    if (dist < buttonSize * 0.7 / 2) {
      this.state = !this.state;
    }
  }
}
