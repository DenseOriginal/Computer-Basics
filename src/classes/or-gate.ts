import { GenericOperator } from './generic-operators';

export class OrGate extends GenericOperator {
  constructor() {
    super(2, 1, 'OR');
  }

  logic() {
    this.outputs[0].setStatus(this.inputs[0].status || this.inputs[1].status);
  }
}
