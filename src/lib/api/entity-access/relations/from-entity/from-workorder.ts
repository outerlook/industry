import type {validTypes} from '@/lib/io-ts/valid-types';
import {workorderLens} from '@/lib/api/lenses/entityLenses';
import {flow} from 'effect';
import {$api} from '@/lib/api/fetch/rxjs-api';
import {
    entitiesFromIdLens,
    entityFromIdLens,
} from '@/lib/api/entity-access/relations/generic';
import type {
    DirectRelationsRecord,
    IndirectRelationsRecord,
} from '@/lib/api/entity-access/relations/relation-types';

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
