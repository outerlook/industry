import {Ord} from "fp-ts/Ord";
import {validTypes} from "@services/api/validation/valid-types";
import * as S from "fp-ts/string";

/**
 * In order of lightest status to the most critical
 */
export const statusCriticalOrd: Ord<validTypes['Status']> = {
    equals: S.Eq.equals,
    compare: (x, y) => {
        const ascOrder = [
            'inOperation',
            'inAlert',
            'plannedStop',
            'unplannedStop',
            'inDowntime',
        ] satisfies validTypes['Status'][];

        // @ts-expect-error Just for knowing
        type AreAllThere =
            validTypes['Status'] extends (typeof ascOrder)[number] ? 'OK' : never;
        return ascOrder.indexOf(x) - ascOrder.indexOf(y) as 1 | 0 | -1
    },
};