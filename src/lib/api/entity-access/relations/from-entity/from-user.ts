import type {validTypes} from '@/lib/io-ts/valid-types';
import {userLens} from '@/lib/api/lenses/entityLenses';
import {flow} from 'effect';
import {$api} from '@/lib/api/fetch/rxjs-api';
import {entityFromIdLens} from '@/lib/api/entity-access/relations/generic';
import type {DirectRelationsRecord, IndirectRelationsRecord,} from '@/lib/api/entity-access/relations/relation-types';
import {getRelatedEntitiesByIdArrayKey} from '@/lib/api/entity-access/relations/compare/relates-to-entity';
import {assetApi} from '@/lib/api/entity-access/self/asset';
import {workorderApi} from '@/lib/api/entity-access/self/workorder';

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
