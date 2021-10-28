import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";

export class OrGate extends GenericOperator {
  constructor(pos: Vector) {
    super(pos, 'OR');
  }
  
  logic() {
    this.output.setStatus(this.inputA.status || this.inputB.status);
  }
}