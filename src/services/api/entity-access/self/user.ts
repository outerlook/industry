// self
import {entityFromId} from "@services/api/entity-access/relations/generic";
import {$api} from "@services/api/fetch/rxjs-api";
import {fromEitherObservable} from "@lib/rxjs/from-either-observable";

const userFromId = entityFromId($api.User.byId);
const allUsers = fromEitherObservable($api.User.all());
export const userApi = {
    userFromId,
    all: allUsers,
};