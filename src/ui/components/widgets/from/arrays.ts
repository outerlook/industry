import {flow, pipe} from 'effect';
import * as I from 'fp-ts/Identity';
import {LabelledNumber} from '../LabelledNumber';
import * as R from 'fp-ts/Record';
import {PieChart} from '../charts/PieChart';
import type {Object} from 'ts-toolbelt';
import * as A from 'fp-ts/Array';
import _ from 'lodash';
import {Lens} from "monocle-ts";

export const arrayToCountWidget = (label: string) => (arr: any[]) =>
  pipe(
    arr.length,
    I.bindTo('n'),
    I.bind('label', () => label),
    I.map(LabelledNumber)
  );

const countLens = Lens.fromProps<{ title: string; items: any[] }>();
export const ArrayCountWidget = flow(
  countLens(['title', 'items']).get,
  I.map(({ title, items }) => arrayToCountWidget(title)(items))
);

const groupBy =
  <T extends { [key: string]: any }, K extends keyof T>(
    key: K & Object.SelectKeys<T, string>
  ) =>
  (arr: T[]): Record<T[K], T[]> => {
    return _.groupBy(arr, key) as Record<T[K], T[]>;
  };

export const toPieChartByKey =
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
