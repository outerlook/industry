import * as E from "fp-ts/Either";

export const getOrThrow = <E, T>(either: E.Either<E, T>) => {
    if (E.isLeft(either)) {
        throw either.left;
    }
    return either.right;
};