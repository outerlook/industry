// self
import {entityFromId} from "@services/api/entity-access/relations/generic";
import {$api} from "@services/api/fetch/rxjs-api";
import {fromEitherObservable} from "@lib/rxjs/from-either-observable";

const companyFromId = entityFromId($api.Company.byId);
const allCompanies = fromEitherObservable($api.Company.all());
export const companyApi = {
    fromId: companyFromId,
    all: allCompanies
}