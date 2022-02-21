import { GenericOperator } from './generic-operators';

export class NotGate extends GenericOperator {
  public constructor() {
    super(1, 1, 'NOT');
  }

  logic(): void {
    this.outputs[0].setStatus(!this.inputs[0].status);
  }
}
