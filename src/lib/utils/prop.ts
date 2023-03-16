export const prop =
    <T, K extends keyof T>(k: K) =>
        (a: T) =>
            a[k];