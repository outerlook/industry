import { assetLens } from '@/lib/api/lenses/entityLenses';
import type { validTypes } from '@/lib/io-ts/valid-types';
import { flow } from 'effect';
import { $api } from '@/lib/api/fetch/rxjs-api';
import * as OE from 'fp-ts-rxjs/ObservableEither';
import {
  entitiesFromIdLens,
  entityFromId,
  entityFromIdLens,
} from '@/lib/api/relations/generic';

// Types
export type AssetRelations = {
  company: validTypes['Company'];
  unit: validTypes['Unit'];
  assignedUsers: validTypes['User'][];
  workorders: validTypes['Workorder'][];
};

// Lenses
const assetCompanyIdLens = assetLens(['companyId']);
const assetUnitIdLens = assetLens(['unitId']);
const assetAssignedUserIdsLens = assetLens(['assignedUserIds']);

// self
const assetFromId = entityFromId($api.Asset.byId);
const allAssets = OE.fromObservable($api.Asset.all());

// direct relations
const companyFromAsset = flow(
  entityFromIdLens(assetCompanyIdLens, $api.Company.byId)
);

const unitFromAsset = flow(entityFromIdLens(assetUnitIdLens, $api.Unit.byId));

const assignedUsersFromAsset = flow(
  entitiesFromIdLens(assetAssignedUserIdsLens, $api.User.byId)
);

// indirect relations (task inside task)
declare const workordersFromAsset: (
  asset: validTypes['Asset']
) => OE.ObservableEither<'error', validTypes['Workorder'][]>;

// exports
export const fromAsset = {
  company: companyFromAsset,
  unit: unitFromAsset,
  assignedUsers: assignedUsersFromAsset,
  workorders: workordersFromAsset,
};

export const assetApi = {
  assetFromId,
  allAssets,
};
