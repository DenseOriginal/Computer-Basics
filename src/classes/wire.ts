import { Drawable } from "./interfaces";
import { OutputNode, InputNode } from "./node";

export type Status = boolean;

export class Wire implements Drawable {
  public status: Status = false;

  public output: OutputNode | undefined;
  public input: InputNode | undefined;

  draw() {
    push();

    strokeWeight(4);
    stroke(this.status ? '#f55151' : '#383838');
    
    if(this.input && this.output) {
      line(
        this.output.pos.x,
        this.output.pos.y,
        this.input.pos.x,
        this.input.pos.y
      );
    }

    pop();
  }

  connect(input: InputNode, output: OutputNode) {
    this.input = input;
    this.output = output;
    input.connectWire(this);
    output.connectWire(this);
  }

  static HIGH: true = true;
  static LOW: false = false;
}