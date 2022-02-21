import { GenericOperator } from './generic-operators';

export class Output extends GenericOperator {
  public state: boolean = false;

  constructor() {
    super(1, 0);
  }

  override customDraw() {
    push();

    rectMode(CENTER);
    noStroke();

    // Draw a smaller rectangle to represent the output
    // A high value is a green rectangle
    // And a low value is a darkgrey rectangle
    fill(this.inputs[0].status ? '#a0ffa0' : '#101010');
    rect(this.pos.x, this.pos.y, this.width * 0.75, this.height * 0.75, 2, 2, 2, 2);

    pop();
  }

  logic(): void {
    this.state = this.inputs[0].status;
  }
}
