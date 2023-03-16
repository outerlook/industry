import { pipe } from 'effect';
import * as I from 'fp-ts/Identity';
import { LabelledNumber } from '../LabelledNumber';
import * as R from 'fp-ts/Record';
import { PieChart } from '../PieChart';
import type { Object } from 'ts-toolbelt';
import * as A from 'fp-ts/Array';
import _ from 'lodash';

export const arrayToCountWidget = (label: string) => (arr: any[]) =>
  pipe(
    arr.length,
    I.bindTo('n'),
    I.bind('label', () => label),
    I.map(LabelledNumber)
  );

const groupBy =
  <T extends { [key: string]: any }, K extends keyof T>(
    key: K & Object.SelectKeys<T, string>
  ) =>
  (arr: T[]): Record<T[K], T[]> => {
    return _.groupBy(arr, key) as Record<T[K], T[]>;
  };
// declare const groupBy: <T extends { [key: string]: any }, K extends keyof T>(
//   key: K & Object.SelectKeys<T, string>
// ) => (arr: T[]) => Record<T[K], T[]>

export const toPieChart =
  <T extends { [key: string]: any }>(
    key: keyof T & Object.SelectKeys<T, string>
  ) =>
  (arr: T[]) => {
    return pipe(
      arr,
      groupBy(key),
      R.map(arr => arr.length),
      R.toEntries,
      A.map(([name, value]) => ({ name, value })),
      I.bindTo('data'),
      I.map(PieChart)
    );
  };
