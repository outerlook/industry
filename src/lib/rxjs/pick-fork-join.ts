import type { Observable} from "rxjs";
import {forkJoin} from "rxjs";
import _ from "lodash";

export const pickForkJoin = <
    R extends Record<string, Observable<any>>,
    K extends keyof R
>(
    rec: R,
    ...keys: K[]
) => {
    return forkJoin(_.pick(rec, ...keys));
};