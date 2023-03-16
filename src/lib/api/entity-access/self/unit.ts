// self
import {entityFromId} from "@/lib/api/entity-access/relations/generic";
import {$api} from "@/lib/api/fetch/rxjs-api";
import {fromEitherObservable} from "@/lib/rxjs/fp-ts/from-either-observable";

const unitFromId = entityFromId($api.Unit.byId);
const allUnits = fromEitherObservable($api.Unit.all());
export const unitApi = {
    unitFromId,
    all: allUnits,
};