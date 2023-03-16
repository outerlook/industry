import {pipe} from "effect";
import {entitiesSearchIndex$} from "../entities/search-index/entity-search-items";
import * as OE from "fp-ts-rxjs/ObservableEither";
import {pagesIndex} from "./pages-index";

export const appSearchIndex$ = pipe(
    entitiesSearchIndex$,
    // concat with pagesIndex
    OE.map(items => [...items, ...pagesIndex])
);