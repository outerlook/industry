import type {customScalars} from '../../../validation/api-types';
import type {Eq} from 'fp-ts/Eq';
import type * as t from 'io-ts';
import * as N from 'fp-ts/number';
import type {O} from 'ts-toolbelt';
import {flow, pipe} from 'effect';
import * as A from 'fp-ts/Array';
import * as OE from 'fp-ts-rxjs/ObservableEither';

/*
 * This file contains functions for comparing entities by their ID.
 *
 * For example
 *
 * asset is assigned to some users when
 * when asset.assignedUserIds contains user.id
 *
 * A user is from a company when
 * user.companyId === company.id
 *
 * then we can create functions that compare entities by their ID
 *
 * relatesToEntityByIdKey(user, 'companyId')(company) === true when user.companyId === company.id
 */

// Types

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

// Helpers

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
    // @ts-expect-error FIXME or test-guard
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

/**
 * @example
 * const getCompanyAssets = getRelatedEntitiesByIdArrayKey(getAllAssets, 'companyId');
 * const companyAssets = getCompanyAssets(company);
 */
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

/**
 * this is to deal with one to many relationships
 * @example
 * const getUserAssets = getRelatedEntitiesByIdArrayKey(getAllAssets, 'assignedUserIds');
 * const userAssets = getUserAssets(user);
 */
export const getRelatedEntitiesByIdArrayKey =
  <
    Errors,
    EntitiesType extends object,
    Key extends SelectIDKeysToMany<EntitiesType>,
    T extends IdentifiableObject
  >(
    allEntitiesOE: OE.ObservableEither<
      Errors,
      (EntitiesType & { [key in Key]: IDType[] })[]
    >,
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
          A.filter(possibleRelatedEntity =>
            possibleRelatedEntity[key].includes(entity.id)
          )
        )
      )
    );
