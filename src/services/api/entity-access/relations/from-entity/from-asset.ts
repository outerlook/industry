import {assetLens} from "@domain/lib/entities/lenses/entity-lenses";
import type {validTypes} from '../../../validation/valid-types';
import {flow} from 'effect';
import {$api} from '@services/api/fetch/rxjs-api';
import {entitiesFromIdLens, entityFromIdLens,} from '@services/api/entity-access/relations/generic';
import type {
  DirectRelationsRecord,
  IndirectRelationsRecord,
} from '@services/api/entity-access/relations/relation-types';
import {getRelatedEntitiesByIdKey} from '@services/api/entity-access/relations/compare/relates-to-entity';
import {workorderApi} from '@services/api/entity-access/self/workorder';

// Types
export type AssetDirectRelations = {
    company: validTypes['Company'];
    unit: validTypes['Unit'];
    assignedUsers: validTypes['User'][];
};

// Lenses
const assetCompanyIdLens = assetLens(['companyId']);
const assetUnitIdLens = assetLens(['unitId']);
const assetAssignedUserIdsLens = assetLens(['assignedUserIds']);

// direct relations
const companyFromAsset = flow(
    entityFromIdLens(assetCompanyIdLens, $api.Company.byId)
);

const unitFromAsset = flow(entityFromIdLens(assetUnitIdLens, $api.Unit.byId));

const assignedUsersFromAsset = flow(
    entitiesFromIdLens(assetAssignedUserIdsLens, $api.User.byId)
);

const directRelations = {
    company: companyFromAsset,
    unit: unitFromAsset,
    assignedUsers: assignedUsersFromAsset,
} satisfies DirectRelationsRecord<'Asset'>;

// indirect relations
const indirectRelations = {
    workorder: getRelatedEntitiesByIdKey(workorderApi.all, 'assetId'),
} satisfies IndirectRelationsRecord<'Asset'>;

// exports
export const fromAsset = {
    ...directRelations,
    ...indirectRelations,
};
