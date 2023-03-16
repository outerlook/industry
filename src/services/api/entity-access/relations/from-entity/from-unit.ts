import {unitLens} from "@domain/lib/entities/lenses/entity-lenses";
import type {validTypes} from "../../../validation/valid-types";
import {flow} from 'effect';
import {$api} from '@services/api/fetch/rxjs-api';
import {entityFromIdLens} from '@services/api/entity-access/relations/generic';
import type {
  DirectRelationsRecord,
  IndirectRelationsRecord,
} from '@services/api/entity-access/relations/relation-types';
import {getRelatedEntitiesByIdKey} from '@services/api/entity-access/relations/compare/relates-to-entity';
import {assetApi} from '@services/api/entity-access/self/asset';
import {userApi} from '@services/api/entity-access/self/user';

// Types
export type UnitDirectRelations = {
    company: validTypes['Company'];
};

// Lenses
const unitCompanyIdLens = unitLens(['companyId']);

// direct relations
const companyFromUnit = flow(
    entityFromIdLens(unitCompanyIdLens, $api.Company.byId)
);

const directRelations = {
    company: companyFromUnit,
} satisfies DirectRelationsRecord<'Unit'>;

// indirect relations (task inside task)
const indirectRelations = {
    asset: getRelatedEntitiesByIdKey(assetApi.all, 'unitId'),
    user: getRelatedEntitiesByIdKey(userApi.all, 'unitId'),
} satisfies IndirectRelationsRecord<'Unit'>;

// exports
export const fromUnit = {
    ...directRelations,
    ...indirectRelations,
};
