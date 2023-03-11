import type {apiTypes, entityTypes} from "./api-types";
import type * as t from "io-ts";

export type validTypes = {
  [key in keyof typeof apiTypes]: t.TypeOf<(typeof apiTypes)[key]>;
};

export type Entities = keyof typeof entityTypes;
export type validEntities = Pick<validTypes, Entities>;
