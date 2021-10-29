import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

export class NotGate extends GenericOperator {
  public constructor(
    pos: Vector,
  ) {
    super(pos, 1, 1, 'NOT');
  }

  logic(): void {
    this.outputs[0].setStatus(!this.inputs[0].status);
  }
}