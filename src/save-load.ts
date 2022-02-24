import { GenericOperator } from './classes/generic-operators';
import { Wire } from './classes/wire';
import { getOperator } from './helpers';

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

export function parseOperators(input: string): GenericOperator[] {
  const relations = <RelationMap>JSON.parse(input);
  const operators = new Map<string, GenericOperator>();

  // Loop over every operator
  // And instatiate them
  relations.operators.forEach((opDescription) => {
    // Destructure the operator description
    const { id, className } = opDescription;

    // Try to retrieve the operator class, from the operatorMap
    const operatorClass = getOperator(className);

    // If the operatorClass wasn't found then throw an error
    if (!operatorClass) throw new Error(`Unknown class '${className}'`);

    // eslint-disable-next-line new-cap
    const newOperator = new operatorClass();

    // Give the new operator the correct ID
    newOperator.setId(id);

    // Add the new operator to the Map with the id as the key
    operators.set(id, newOperator);
  });

  relations.connections.forEach((connection) => {
    // Destructure the connection
    const { id, from, to } = connection;

    // Instantiate the new wire, with the correct ID
    const newWire = new Wire(id);

    // Retriwve the correct opeators from the Map
    const fromOperator = operators.get(from.id);
    const toOperator = operators.get(to.id);

    // Check if both operators exist
    if (!fromOperator) throw new Error(`Incorrect id for fromOperator: ${from.id}`);
    if (!toOperator) throw new Error(`Incorrect id for toOperator: ${to.id}`);

    // Connect the wire to the correct nodes
    newWire.connect(toOperator.inputs[to.node], fromOperator.outputs[from.node]);
  });

  return Array.from(operators.values());
}

export function saveCircuitInLocalStorage(operators: GenericOperator[], name: string): void {
  const stringifiedOperators = stringifyOperators(operators);
  const stringToSave = `${name}|${stringifiedOperators}`;

  // Prefix the key with 'circuit' to avoid collision between other keys
  localStorage.setItem(`circuit-${name}`, stringToSave);
}

export function loadCircuitFromLocalStorage(name: string): string | undefined {
  const rawItem = localStorage.getItem(`circuit-${name}`);
  if (!rawItem) return undefined;

  // Split the raw item by the delimeter '|'
  // And  get the second item in the array
  const stringifiedOperators = rawItem.split('|')[1];

  // Parse and return the operators
  return stringifiedOperators;
}

export function loadAllCircuits(): string[] {
  const circuits: string[] = [];

  for (let idx = 0; idx < localStorage.length; idx++) {
    const key = localStorage.key(idx);
    if (key && key.startsWith('circuit-')) {
      // Get pretty name from the item
      const name = localStorage.getItem(key)?.split('|')[0];

      // If the name exists, then push it to the circuits array
      if (name) circuits.push(name);
    }
  }

  return circuits;
}

(window as any).loadAllCircuits = loadAllCircuits;
