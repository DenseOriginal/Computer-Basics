import { Drawable } from './interfaces';
import { OutputNode, InputNode } from './node';

export type Status = boolean;

// Wire class that describes a connection between an input- and output-node
// A wire can only be connected to 1 input and 1 output
export class Wire implements Drawable {
  public status: Status = false;
  public readonly id: string = Math.random().toString(36).substr(2, 9);

  public output: OutputNode | undefined;
  public input: InputNode | undefined;

  draw() {
    push();

    strokeWeight(4);
    stroke(this.status ? '#f55151' : '#383838');

    if (this.input && this.output) {
      line(
        this.output.pos.x,
        this.output.pos.y,
        this.input.pos.x,
        this.input.pos.y,
      );
    }

    pop();
  }

  public connect(input: InputNode, output: OutputNode) {
    this.input = input;
    this.output = output;
    input.connectWire(this);
    output.connectWire(this);
  }

  public destroy() {
    this.input?.removeWire(this);
    this.output?.removeWire(this);
  }

  static HIGH: true = true;
  static LOW: false = false;
}
