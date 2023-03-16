// self
import {entityFromId} from "@/lib/api/entity-access/relations/generic";
import {$api} from "@/lib/api/fetch/rxjs-api";
import {fromEitherObservable} from "@/lib/rxjs/fp-ts/from-either-observable";

const workorderFromId = entityFromId($api.WorkOrder.byId);
const allWorkorders = fromEitherObservable($api.WorkOrder.all());
export const workorderApi = {
    workorderFromId,
    all: allWorkorders,
};