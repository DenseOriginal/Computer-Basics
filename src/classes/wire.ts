import { getRandID } from '../helpers';
import { ConnectionDescription } from '../save-load';
import { Drawable, HasID } from './interfaces';
import { OutputNode, InputNode } from './node';

export type Status = boolean;

// Wire class that describes a connection between an input- and output-node
// A wire can only be connected to 1 input and 1 output
export class Wire implements Drawable, HasID {
  public status: Status = false;

  public output: OutputNode | undefined;
  public input: InputNode | undefined;

  // eslint-disable-next-line no-useless-constructor
  constructor(public readonly id = getRandID()) { /* */ }

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

  public describeRelation(): ConnectionDescription | undefined {
    // If this wire isn't fully connected return undefined
    if (!this.output || !this.input) return;

    return {
      id: this.id,
      from: { id: this.output.parent.id, node: this.output.getNodeNumber() },
      to: { id: this.input.parent.id, node: this.input.getNodeNumber() },
    };
  }

  static HIGH: true = true;
  static LOW: false = false;
}
