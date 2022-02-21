import { GenericOperator } from './classes/generic-operators';

export const getRandID = () => [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// Operator map and stuff
type GenericOperatorConstructor = new (...args:any[]) => GenericOperator;

const operatorMap = new Map<string, GenericOperatorConstructor>();

export function registerOperator(constructor: GenericOperatorConstructor) {
  const { name } = constructor;
  operatorMap.set(name, constructor);
}

export function getOperator(name: string): GenericOperatorConstructor | undefined {
  return operatorMap.get(name);
}
