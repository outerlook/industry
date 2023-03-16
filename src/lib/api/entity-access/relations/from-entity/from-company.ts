import {$api} from '@/lib/api/fetch/rxjs-api';
import type {
    DirectRelationsRecord,
    IndirectRelationsRecord,
} from '@/lib/api/entity-access/relations/relation-types';
import {getRelatedEntitiesByIdKey} from "@/lib/api/entity-access/relations/compare/relates-to-entity";
import {assetApi} from "@/lib/api/entity-access/self/asset";
import {userApi} from "@/lib/api/entity-access/self/user";
import {unitApi} from "@/lib/api/entity-access/self/unit";

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
