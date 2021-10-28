import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

export class AndGate extends GenericOperator {
  constructor(pos: Vector) {
    super(pos, 'AND');
  }
  
  logic() {
    this.output.setStatus(this.inputA.status && this.inputB.status);
  }
}
