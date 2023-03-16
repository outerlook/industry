import type {validTypes} from '../../../validation/valid-types';
import {workorderLens} from "@domain/lib/entities/lenses/entity-lenses";
import {flow} from 'effect';
import {$api} from '@services/api/fetch/rxjs-api';
import {entitiesFromIdLens, entityFromIdLens,} from '@services/api/entity-access/relations/generic';
import type {
    DirectRelationsRecord,
    IndirectRelationsRecord,
} from '@services/api/entity-access/relations/relation-types';

export type WorkorderDirectRelations = {
  asset: validTypes['Asset'];
  assignedUsers: validTypes['User'][];
};

// lenses
const workorderAssetIdLens = workorderLens(['assetId']);
const workorderAssignedUserIdsLens = workorderLens(['assignedUserIds']);

// direct relations
const assetFromWorkorder = flow(
  entityFromIdLens(workorderAssetIdLens, $api.Asset.byId)
);

const assignedUsersFromWorkorder = flow(
  entitiesFromIdLens(workorderAssignedUserIdsLens, $api.User.byId)
);

const directRelations = {
  asset: assetFromWorkorder,
  assignedUsers: assignedUsersFromWorkorder,
} satisfies DirectRelationsRecord<'Workorder'>;

// indirect relations
const indirectRelations = {} satisfies IndirectRelationsRecord<'Workorder'>;

// exports
export const fromWorkorder = {
  ...directRelations,
  ...indirectRelations,
} as const;
