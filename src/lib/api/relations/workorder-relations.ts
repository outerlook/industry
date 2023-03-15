import type { validTypes } from '@/lib/io-ts/valid-types';
import * as OE from 'fp-ts-rxjs/ObservableEither';
import { workorderLens } from '@/lib/api/lenses/entityLenses';
import { flow } from 'effect';
import { $api } from '@/lib/api/fetch/rxjs-api';
import {
  entitiesFromIdLens,
  entityFromId,
  entityFromIdLens,
} from '@/lib/api/relations/generic';

export type WorkorderRelations = {
  asset: validTypes['Asset'];
  assignedUsers: validTypes['User'][];
  company: validTypes['Company'];
  unit: validTypes['Unit'];
};

// lenses
const workorderAssetIdLens = workorderLens(['assetId']);
const workorderAssignedUserIdsLens = workorderLens(['assignedUserIds']);

// self
const workorderFromId = entityFromId($api.WorkOrder.byId);
const allWorkorders = OE.fromObservable($api.WorkOrder.all());

// indirectRelations
const assetFromWorkorder = flow(
  entityFromIdLens(workorderAssetIdLens, $api.Asset.byId)
);

const assignedUsersFromWorkorder = flow(
  entitiesFromIdLens(workorderAssignedUserIdsLens, $api.User.byId)
);

// exports
export const fromWorkorder = {
  asset: assetFromWorkorder,
  assignedUsers: assignedUsersFromWorkorder,
};

export const workorderApi = {
  workorderFromId,
  allWorkorders,
};
