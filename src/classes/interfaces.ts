import { GenericOperator } from './generic-operators';

export interface Drawable {
  draw(): void;
}

export interface HasID {
  readonly id: string;
}

export interface SavedCombinedOperator {
  [ index: string ]: GenericOperator[]
}
