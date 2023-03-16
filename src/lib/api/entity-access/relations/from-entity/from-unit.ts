import { unitLens } from '@/lib/api/lenses/entityLenses';
import type { validTypes } from '@/lib/io-ts/valid-types';
import { flow } from 'effect';
import { $api } from '@/lib/api/fetch/rxjs-api';
import { entityFromIdLens } from '@/lib/api/entity-access/relations/generic';
import type {
  DirectRelationsRecord,
  IndirectRelationsRecord,
} from '@/lib/api/entity-access/relations/relation-types';
import { getRelatedEntitiesByIdKey } from '@/lib/api/entity-access/relations/compare/relates-to-entity';
import { assetApi } from '@/lib/api/entity-access/self/asset';
import { userApi } from '@/lib/api/entity-access/self/user';

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
