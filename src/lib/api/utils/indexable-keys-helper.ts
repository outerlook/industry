import { pipe } from "effect";

const keysToString =
  <T extends Record<string, unknown>>(...keys: (keyof T)[]) =>
  (obj: T) =>
    keys.map((k) => obj[k]).join(" ");
const prepend = (prefix: string) => (str: string) => `${prefix} ${str}`;

/**
 * this aims to help with the creation of indexable keys, to use on search
 * @param keys
 */
export const getObjIndexableKeyFromKeys =
  <T extends Record<string, unknown>, K extends keyof T>(
    name: string,
    ...keys: K[]
  ) =>
  (obj: T) =>
    pipe(obj, keysToString(...keys), prepend(name));
