import { contramap, Ord } from 'fp-ts/Ord';
import { validTypes } from '@services/api/validation/valid-types';
import { pipe } from 'effect';
import * as N from 'fp-ts/number';

export const healthHistoryDateOrd: Ord<validTypes['HealthHistory']> = pipe(
  N.Ord,
  contramap(s => s.timestamp.getTime())
);
