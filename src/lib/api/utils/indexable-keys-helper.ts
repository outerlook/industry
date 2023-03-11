import { flow } from "effect";
import * as A from "fp-ts/Array";

const arrayFromKeys =
  <T extends Record<string, unknown>>(...keys: (keyof T)[]) =>
  (obj: T) =>
    keys.map((k) => obj[k]);

/**
 * this aims to help with the creation of indexable keys, to use on search
 * @param keys
 */
export const getObjectKeywordsFromKeys = <
  T extends Record<string, unknown>,
  K extends keyof T & string
>(
  ...keys: K[]
) => flow(arrayFromKeys(...keys), A.map(String));
