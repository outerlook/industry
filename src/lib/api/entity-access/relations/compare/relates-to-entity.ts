import { customScalars } from '@/lib/io-ts/api-types';
import type { Eq } from 'fp-ts/Eq';
import * as t from 'io-ts';
import * as N from 'fp-ts/number';
import type { O } from 'ts-toolbelt';
import { flow, pipe } from 'effect';
import * as A from 'fp-ts/Array';
import * as OE from 'fp-ts-rxjs/ObservableEither';

type IDType = t.TypeOf<typeof customScalars.ID>;

export type IdentifiableObject = {
  id: IDType;
};

export type SelectIDKeys<Src extends object> = O.SelectKeys<
  Src,
  IDType,
  'equals'
>;

export type SelectIDKeysToMany<Src extends object> = O.SelectKeys<
  Src,
  IDType[],
  'equals'
>;

const eqID = N.Eq as Eq<IDType>;

export const relatesToEntityByIdKey =
  <
    K extends SelectIDKeys<Src>,
    Src extends object,
    Target extends {
      id: IDType;
    }
  >(
    target: Target,
    key: K
  ) =>
  (entity: Src) =>
    eqID.equals(entity[key], target.id);

export const filterRelatedEntitiesByIdKey = <
  K extends O.SelectKeys<Src, IDType, 'equals'>,
  Src extends object,
  Target extends {
    id: IDType;
  }
>(
  target: Target,
  key: K
): ((src: Src[]) => Src[]) =>
  flow(A.filter(relatesToEntityByIdKey(target, key)));

export const getRelatedEntitiesByIdKey =
  <
    Errors,
    EntitiesType extends object,
    Key extends SelectIDKeys<EntitiesType>,
    T extends IdentifiableObject
  >(
    allEntitiesOE: OE.ObservableEither<Errors, EntitiesType[]>,
    key: Key
  ) =>
  (t: T) =>
    pipe(
      OE.of(t),
      OE.bindTo('entity'),
      OE.bindW('relatedEntities', () => allEntitiesOE),
      OE.map(({ entity, relatedEntities }) =>
        pipe(relatedEntities, filterRelatedEntitiesByIdKey(entity, key))
      )
    );

export const getRelatedEntitiesByIdArrayKey =
  <
    Errors,
    EntitiesType extends object,
    Key extends SelectIDKeysToMany<EntitiesType>,
    T extends IdentifiableObject
  >(
    allEntitiesOE: OE.ObservableEither<Errors, EntitiesType[]>,
    key: Key
  ) =>
  (t: T) =>
    pipe(
      OE.of(t),
      OE.bindTo('entity'),
      OE.bindW('relatedEntities', () => allEntitiesOE),
      OE.map(({ entity, relatedEntities }) =>
        pipe(
          relatedEntities,
            A.filter((possibleRelatedEntity) => possibleRelatedEntity[key].includes(entity.id))
        )
      )
    );
