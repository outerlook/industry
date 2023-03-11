import { flow, pipe } from "effect";
import Fuse from "fuse.js";
import { entitiesSearchIndex$ } from "@/lib/api/search-index/search-items";
import * as OE from "fp-ts-rxjs/ObservableEither";
import { pagesIndex } from "@/lib/search-service/pages-index";

export type SearchItem = {
  label: string;
  /** this will be used to index the search records */
  type: string;
  object?: any;
  href: string;
};

export const allSearchIndex$ = pipe(
  entitiesSearchIndex$,
  // concat with pagesIndex
  OE.map((items) => [...items, ...pagesIndex])
);

export const fuseForSearchItems = flow(
  (items: SearchItem[]) =>
    new Fuse(items, {
      keys: [{name: 'label', weight: 2}, "object", "type"],
      includeScore: true,
      threshold: 0.3,
      minMatchCharLength: 2,
      ignoreLocation: true,
      shouldSort: true,
    })
);
