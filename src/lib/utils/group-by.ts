import { Object } from 'ts-toolbelt';
import _ from 'lodash';
import type { NonEmptyArray } from 'fp-ts/NonEmptyArray';

export type Grouped<T extends object, V extends string> = Record<
  V,
  NonEmptyArray<T>
>;

export type GroupedBy<
  T extends { [key: string]: any },
  K extends keyof T
> = Grouped<T, T[K]>;

export const groupBy =
  <T extends { [key: string]: any }, K extends keyof T>(
    key: K & Object.SelectKeys<T, string | number>
  ) =>
  (arr: T[]): GroupedBy<T, K> => {
    return _.groupBy(arr, key) as GroupedBy<T, K>;
  };
