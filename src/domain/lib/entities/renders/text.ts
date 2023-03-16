import { allUsedScalars } from '@services/api/validation/api-types';
import type * as t from 'io-ts';
import { flow } from 'effect';
import { append } from 'fp-ts-std/String';

const appendAny = (txt: string) => flow(String, append(txt));
export const scalarFormatters = {
  CelciusTemperature: appendAny('°C'),
  ID: String,
  Percentile: appendAny('%'),
  Power: appendAny('W'),
  RPM: appendAny('rpm'),
  String: String,
  Boolean: v => (v ? 'Yes' : 'No'),
  Date: String,
  Number: String,
} as {
  [k in keyof typeof allUsedScalars]: (
    n: t.TypeOf<(typeof allUsedScalars)[k]>
  ) => string;
};
