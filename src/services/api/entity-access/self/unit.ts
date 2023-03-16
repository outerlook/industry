// self
import {entityFromId} from "../relations/generic";
import {$api} from "../../fetch/rxjs-api";
import {fromEitherObservable} from "@lib/rxjs/from-either-observable";

const unitFromId = entityFromId($api.Unit.byId);
const allUnits = fromEitherObservable($api.Unit.all());
export const unitApi = {
    unitFromId,
    all: allUnits,
};