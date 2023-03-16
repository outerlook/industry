// self
import {entityFromId} from "@/lib/api/entity-access/relations/generic";
import {$api} from "@/lib/api/fetch/rxjs-api";
import {fromEitherObservable} from "@/lib/rxjs/fp-ts/from-either-observable";

const companyFromId = entityFromId($api.Company.byId);
const allCompanies = fromEitherObservable($api.Company.all());
export const companyApi = {
    companyFromId,
    allCompanies
}