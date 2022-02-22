import { GenericOperator } from './classes/generic-operators';

export type OperatorDescription = { id: string, className: string };
export type ConnectionDescription = {
  id: string,
  from: { id: string, node: number },
  to: { id: string, node: number },
}
export interface RelationMap {
  operators: OperatorDescription[],
  connections: ConnectionDescription[],
}

export function stringifyOperators(operators: GenericOperator[]): string {
  const relations: RelationMap = {
    operators: [],
    connections: [],
  };

  // Loop over all the operators that we're givin
  operators.forEach((op) => {
    if (op.constructor.name == 'CombinedOperators') throw new Error('Can\'t do CombinedOperators yet...');

    // Register the current operators
    relations.operators.push({
      id: op.id,
      className: op.constructor.name,
    });

    // We only need to loop over every input
    // Because we can be sure that every wire is between an output and an input
    // Therefore we only need to check inputs or outputs, not both of them.
    // If we do check both then we'll encounter wires we have already looked at.
    op.inputs.forEach((node) => {
      // A connection goes from Output -> Input
      const connection = node.getWireRelation();
      if (!connection) return; // If the relation is undefined, just skip it

      relations.connections.push(connection);
    });
  });

  return JSON.stringify(relations);
}
