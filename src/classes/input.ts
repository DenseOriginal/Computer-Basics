import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

export class Input extends GenericOperator {
  public state: boolean = false;

  constructor(pos: Vector) {
    super(pos, 0, 1, 'Input');
  }

  logic(): void {
    this.outputs[0].setStatus(this.state);
  }
}