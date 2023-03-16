// self
import {entityFromId} from "@/lib/api/entity-access/relations/generic";
import {$api} from "@/lib/api/fetch/rxjs-api";
import {fromEitherObservable} from "@/lib/rxjs/fp-ts/from-either-observable";

const userFromId = entityFromId($api.User.byId);
const allUsers = fromEitherObservable($api.User.all());
export const userApi = {
    userFromId,
    all: allUsers,
};