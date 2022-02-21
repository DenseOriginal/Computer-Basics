import { registerOperator } from '../helpers';
import { GenericOperator } from './generic-operators';

export class AndGate extends GenericOperator {
  constructor() {
    super(2, 1, 'AND');
  }

  logic() {
    this.outputs[0].setStatus(this.inputs[0].status && this.inputs[1].status);
  }
}

registerOperator(AndGate);
