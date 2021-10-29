import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

export class Output extends GenericOperator {
  constructor(pos: Vector) {
    super(pos, 1, 0);
  }

  customDraw() {
    push();

    rectMode(CENTER);
    noStroke();

    // Draw a smaller rectangle to represent the output
    // A high value is a green rectangle
    // And a low value is a darkgrey rectangle
    fill(this.inputs[0].status ? '#a0ffa0' : '#101010'); 
    rect(this.pos.x, this.pos.y, this.width * 0.75, this.height * 0.75, 2,2,2,2);

    pop();
  }

  logic(): void { }
}