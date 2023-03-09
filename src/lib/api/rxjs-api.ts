import { api } from "./fetchAPI";
import { defer, map } from "rxjs";
import type { RequestContext } from "mappersmith";
import { apiTypes } from "../io-ts/attributes";
import * as t from "io-ts";

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
  ) =>
    defer(() => fn(...args)).pipe(
      map((res) => res.data()),
      map((v) => codec.decode(v) as t.Validation<t.TypeOf<Codec>>)
    );

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
