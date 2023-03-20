import {contramap, Ord} from "fp-ts/Ord";
import {pipe} from "effect";

export const byNth = <T, Tuple extends { [n in Nth]: T }, Nth extends number>(
    ord: Ord<T>,
    n: Nth
) =>
    pipe(
        ord,
        contramap((s: Tuple) => s[n])
    );