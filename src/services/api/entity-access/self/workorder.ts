// self
import {entityFromId} from "@services/api/entity-access/relations/generic";
import {$api} from "@services/api/fetch/rxjs-api";
import {fromEitherObservable} from "@lib/rxjs/from-either-observable";

const workorderFromId = entityFromId($api.WorkOrder.byId);
const allWorkorders = fromEitherObservable($api.WorkOrder.all());
export const workorderApi = {
    workorderFromId,
    all: allWorkorders,
};