/**
 * Takes array of functions that turn A into B and produce array of B
 * (A -> B)[] -> A -> B[]
 * @param fns
 */
export const applyFunctions =
    <A, B>(...fns: Array<(a: A) => B>) =>
        (a: A): Array<B> =>
            fns.map(fn => fn(a));