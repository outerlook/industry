// self
import {$api} from "@services/api/fetch/rxjs-api";
import {entityFromId} from "@services/api/entity-access/relations/generic";
import {fromEitherObservable} from "@lib/rxjs/fp-ts/from-either-observable";

const assetFromId = entityFromId($api.Asset.byId);
const allAssets = fromEitherObservable($api.Asset.all());
export const assetApi = {
    fromId: assetFromId,
    all: allAssets,
};