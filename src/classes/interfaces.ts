import { GenericOperator } from './generic-operators';

export interface Drawable {
  draw(): void;
}

export interface SavedCombinedOperator {
  [ index: string ]: GenericOperator[]
}
