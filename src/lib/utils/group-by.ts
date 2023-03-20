import {Object} from "ts-toolbelt";
import _ from "lodash";

export const groupBy =
    <T extends { [key: string]: any }, K extends keyof T>(
        key: K & Object.SelectKeys<T, string>
    ) =>
        (arr: T[]): Record<T[K], T[]> => {
            return _.groupBy(arr, key) as Record<T[K], T[]>;
        };
export const groupByMap =
    <T extends { [key: string]: any }, R extends string>(
        mapFn: (t: T) => R
    ) =>
        (arr: T[]): Record<R, T[]> => {
            return _.groupBy(arr, mapFn) as Record<R, T[]>;
        };