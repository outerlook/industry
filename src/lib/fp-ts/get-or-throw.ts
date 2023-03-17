import * as E from "fp-ts/Either";

export const getOrThrow = <T>(either: E.Either<any, T>) => {
    console.log({either})
    if (E.isLeft(either)) {
        throw either.left;
    }
    return either.right;
};