import type { validTypes } from '../../../validation/valid-types';
import { userLens } from '@domain/lib/entities/lenses/entity-lenses';
import { flow } from 'effect';
import { $api } from '@services/api/fetch/rxjs-api';
import { entityFromIdLens } from '@services/api/entity-access/relations/generic';
import type {
  DirectRelationsRecord,
  IndirectRelationsRecord,
} from '@services/api/entity-access/relations/relation-types';
import { getRelatedEntitiesByIdArrayKey } from '@services/api/entity-access/relations/compare/relates-to-entity';
import { assetApi } from '@services/api/entity-access/self/asset';
import { workorderApi } from '@services/api/entity-access/self/workorder';

export type UserDirectRelations = {
  company: validTypes['Company'];
  unit: validTypes['Unit'];
};

// lenses
const userCompanyIdLens = userLens(['companyId']);
const unitIdLens = userLens(['unitId']);

const companyFromUser = flow(
  entityFromIdLens(userCompanyIdLens, $api.Company.byId)
);

const unitFromUser = flow(entityFromIdLens(unitIdLens, $api.Unit.byId));

const directRelations = {
  company: companyFromUser,
  unit: unitFromUser,
} satisfies DirectRelationsRecord<'User'>;

const indirectRelations = {
  asset: getRelatedEntitiesByIdArrayKey(assetApi.all, 'assignedUserIds'),
  workorder: getRelatedEntitiesByIdArrayKey(
    workorderApi.all,
    'assignedUserIds'
  ),
} satisfies IndirectRelationsRecord<'User'>;

// exports
export const fromUser = {
  ...directRelations,
  ...indirectRelations,
} as const;
