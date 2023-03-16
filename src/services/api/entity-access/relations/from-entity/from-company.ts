import type {
    DirectRelationsRecord,
    IndirectRelationsRecord,
} from '@services/api/entity-access/relations/relation-types';
import {getRelatedEntitiesByIdKey} from "@services/api/entity-access/relations/compare/relates-to-entity";
import {assetApi} from "@services/api/entity-access/self/asset";
import {userApi} from "@services/api/entity-access/self/user";
import {unitApi} from "@services/api/entity-access/self/unit";

// Types
export type CompanyDirectRelations = {};

// Lenses
// none

// direct relations
const directRelations = {} satisfies DirectRelationsRecord<'Company'>;

// indirect relations (task inside task)
const indirectRelations = {
    asset: getRelatedEntitiesByIdKey(assetApi.all, 'companyId'),
    user: getRelatedEntitiesByIdKey(userApi.all, 'companyId'),
    unit: getRelatedEntitiesByIdKey(unitApi.all, 'companyId'),
} satisfies IndirectRelationsRecord<'Company'>;

// exports
export const fromCompany = {
    ...directRelations,
    ...indirectRelations,
};
