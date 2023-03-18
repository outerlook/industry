import deepmerge from '@fastify/deepmerge';
import type { Object } from 'ts-toolbelt';
import type { NoInfer } from 'ts-toolbelt/out/Function/NoInfer';

const merge = deepmerge({ all: true });

/**
 * curried deepmerge
 */
// export function deepmergeC<A, B>(a: A): (b: B) => A & B;
export function deepmergeC<T extends object>(
  // no infer, so the result is more important
  a: NoInfer<Object.Partial<T, 'deep'>>
): (b: T) => T;
export function deepmergeC(a: any) {
  return (b: any) => merge(a, b);
}
