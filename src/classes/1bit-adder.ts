import { registerOperator } from '../helpers';
import { GenericOperator } from './generic-operators';

export class BitAdder extends GenericOperator {
  constructor() {
    super(3, 2, '1B Adder');
  }

  logic() {
    const a = this.inputs[0].status;
    const b = this.inputs[1].status;
    const c = this.inputs[2].status;

    const firstSum = xor(a, b);
    const carrySum = xor(firstSum, c);

    this.outputs[0].setStatus(carrySum);
    this.outputs[1].setStatus((a && b) || (firstSum && c));
  }
}

registerOperator(BitAdder);

const xor = (a: boolean, b: boolean) => !(a && b) && (a || b);
