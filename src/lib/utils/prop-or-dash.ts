import {pipe} from "effect";
import {prop} from "./prop";
import * as E from "fp-ts/Either";

export const propOrDash =
    <T, P extends keyof T>(p: P) =>
        (t: T) =>
            pipe(t, prop(p), E.fromNullable("-"));