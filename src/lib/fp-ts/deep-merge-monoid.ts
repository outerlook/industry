import { Monoid } from 'fp-ts/Monoid';
import deepmerge from '@fastify/deepmerge';

/**
 * @example
 * const monoid = deepMergeMonoid(true);
 * const a = {a: {b: 1}};
 * const b = {a: {c: 2}};
 * const c = {a: {b: 3, c: 4}};
 * monoid.concat(a, b) // {a: {b: 1, c: 2}}
 *
 * or to use with fp-ts
 *
 * const result = A.reduce(monoid)([a, b, c]) // {a: {b: 3, c: 4}}
 * @param all
 */
export const deepMergeMonoid = <T extends any>(all: boolean): Monoid<T> => ({
  concat: (a, b) => deepmerge({ all })(a, b) as T,
  empty: {} as T,
});
