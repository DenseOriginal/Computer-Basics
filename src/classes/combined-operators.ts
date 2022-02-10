import { Vector } from "p5";
import { GenericOperator } from "./generic-operators";
import { Input } from "./input";
import { Output } from "./output";

export class CombinedOperators extends GenericOperator {
  inputOperators: Input[];
  outputOperators: Output[];
  childOperators: GenericOperator[];

  constructor(pos: Vector, operators: GenericOperator[], name: string) {
    // Extract the inputs and outputs from all the operators
    // And the sort them in order of their pos.y component
    // This is so that the input/output nodes will match up with the internal input/output operators
    const inputOperators = operators.filter(op => op instanceof Input).sort((a, b) => b.pos.y - a.pos.y) as Input[];
    const outputOperators = operators.filter(op => op instanceof Output).sort((a, b) => b.pos.y - a.pos.y) as Output[];

    // Pass the number of inputs and outputs to the GenericOperator
    // So that it can create the appopriate amount of nodes
    super(pos, inputOperators.length, outputOperators.length, name);

    this.inputOperators = inputOperators;
    this.outputOperators = outputOperators;
    this.childOperators = operators;
  }

  logic(): void {
    // Loop over every input node, and set every internal input operator to the state
    this.inputs.forEach((inp, idx) => this.inputOperators[idx].state = inp.status);

    // Loop over all the operators and run their logic
    this.childOperators.forEach(op => {
      op.logic();
      
    });

    // Loop over every output node, and set it's state the match the internal output opetators state
    this.outputs.forEach((out, idx) => out.setStatus(this.outputOperators[idx].state));
  }
}