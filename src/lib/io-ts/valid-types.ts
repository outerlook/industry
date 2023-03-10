import type {apiTypes} from "./api-types";
import type * as t from 'io-ts'


export type validTypes = {
    [key in keyof typeof apiTypes]: t.TypeOf<typeof apiTypes[key]>
}