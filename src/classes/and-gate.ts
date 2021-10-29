import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

export class AndGate extends GenericOperator {
  constructor(pos: Vector) {
    super(pos, 2, 1, 'AND');
  }
  
  logic() {
    this.outputs[0].setStatus(this.inputs[0].status && this.inputs[1].status);
  }
}
