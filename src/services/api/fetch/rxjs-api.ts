import {api} from "src/services/api/fetch/fetchAPI";
import {defer, map, shareReplay} from "rxjs";
import type {RequestContext} from "mappersmith";
import {apiTypes} from "../validation/api-types";
import * as t from "io-ts";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import {toFetchError} from "@domain/lib/errors/fetch-error";

/**
 * Makes our client typesafe, rxjs friendly and with a nice api
 * It's safe on runtime because io-ts will validate the response
 * @param fn
 */
const fromAPI =
    <Params = undefined>(fn: (...args: any[]) => Promise<{ data: () => any }>) =>
        <Codec extends t.Any>(codec: Codec) =>
            (
                ...args: Params extends undefined
                    ? [any?, RequestContext?]
                    : [Params, RequestContext?]
            ) => {
                // transforms into a taskeither to preserve fetch error
                const executeFn = () => fn(...args);
                const taskEitherFn = TE.tryCatch(executeFn, toFetchError);
                return defer(taskEitherFn).pipe(
                    map(E.map((d) => d.data())),
                    // here it validates an types from response transforming unknown to the codec type
                    map(E.chainW((v) => codec.decode(v) as t.Validation<t.TypeOf<Codec>>)),
                    // map((v) => codec.decode(v) as t.Validation<t.TypeOf<Codec>>),
                    // so it won't fetch twice per downstream observable
                    shareReplay(1)
                );
            };

export const $api = {
    Asset: {
        byId: fromAPI<{ id: string }>(api.Asset.byId)(apiTypes.Asset),
        all: fromAPI(api.Asset.all)(t.array(apiTypes.Asset)),
    },
    User: {
        byId: fromAPI<{ id: string }>(api.User.byId)(apiTypes.User),
        all: fromAPI(api.User.all)(t.array(apiTypes.User)),
    },
    Unit: {
        byId: fromAPI<{ id: string }>(api.Unit.byId)(apiTypes.Unit),
        all: fromAPI(api.Unit.all)(t.array(apiTypes.Unit)),
    },
    Company: {
        byId: fromAPI<{ id: string }>(api.Company.byId)(apiTypes.Company),
        all: fromAPI(api.Company.all)(t.array(apiTypes.Company)),
    },
    WorkOrder: {
        byId: fromAPI<{ id: string }>(api.WorkOrder.byId)(apiTypes.Workorder),
        all: fromAPI(api.WorkOrder.all)(t.array(apiTypes.Workorder)),
    },
} satisfies {
    [key in keyof typeof api]: key extends keyof typeof api
        ? { [key2 in keyof (typeof api)[key]]: any }
        : never;
};
