import type { AssetDirectRelations } from '@/lib/api/entity-access/relations/from-entity/from-asset';
import type { UnitDirectRelations } from '@/lib/api/entity-access/relations/from-entity/from-unit';
import type { CompanyDirectRelations } from '@/lib/api/entity-access/relations/from-entity/from-company';
import type { WorkorderDirectRelations } from '@/lib/api/entity-access/relations/from-entity/from-workorder';
import type { validEntities, validTypes } from '@/lib/io-ts/valid-types';
import type { O } from 'ts-toolbelt';
import type { UserDirectRelations } from '@/lib/api/entity-access/relations/from-entity/from-user';

/**
 * user contains unitId, so we can get unit from user, it's a direct relation
 */
type DirectRelations = {
  Asset: AssetDirectRelations;
  Unit: UnitDirectRelations;
  Company: CompanyDirectRelations;
  Workorder: WorkorderDirectRelations;
  User: UserDirectRelations;
};

type IndirectRelationFor<T extends keyof validEntities> = {
  [key in keyof DirectRelations as 1 extends
    | O.Includes<DirectRelations[key], validTypes[T], 'equals'>
    | O.Includes<DirectRelations[key], validTypes[T][], 'equals'>
    ? key
    : never]: DirectRelations[key];
};

type test = IndirectRelationsRecord<'Asset'>;
type test2 = IndirectRelationsRecord<'Company'>;

export type IndirectRelationsRecord<T extends keyof validEntities> = {
  [key in keyof IndirectRelationFor<T> & string as Lowercase<key>]: (
    entity: validTypes[T]
  ) => any;
};

export type DirectRelationsRecord<
  T extends keyof validEntities & keyof DirectRelations
> = {
  [key in keyof DirectRelations[T] & string as Uncapitalize<key>]: (
    entity: validTypes[T]
  ) => any;
};
