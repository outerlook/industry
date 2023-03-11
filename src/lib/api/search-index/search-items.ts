import type { validTypes } from "@/lib/io-ts/valid-types";
import {
  linkForAsset,
  linkForUnit,
  linkForUser,
  linkForWorkorder,
  linkPropsFromCompany,
} from "@/lib/api/utils/link-from";
import { entityConfig } from "@/lib/api/config";
import { allObjects$ } from "@/lib/api/fetch/fetch-every-object";
import * as OE from "fp-ts-rxjs/ObservableEither";
import { flow, pipe } from "effect";
import Fuse from "fuse.js";

export type SearchItem = {
  label: string;
  /** this will be used to index the search records */
  type: keyof validTypes;
  object: validTypes[keyof validTypes];
  href: string;
};

const assetSearchItem = (entity: validTypes["Asset"]): SearchItem => ({
  label: entityConfig["Asset"].toLabel(entity),
  href: linkForAsset(entity).href,
  object: entity,
  type: "Asset",
});

const userSearchItem = (entity: validTypes["User"]): SearchItem => ({
  label: entityConfig["User"].toLabel(entity),
  href: linkForUser(entity).href,
  object: entity,
  type: "User",
});

const unitSearchItem = (entity: validTypes["Unit"]): SearchItem => ({
  label: entityConfig["Unit"].toLabel(entity),
  href: linkForUnit(entity).href,
  object: entity,
  type: "Unit",
});

const companySearchItem = (entity: validTypes["Company"]): SearchItem => ({
  label: entityConfig["Company"].toLabel(entity),
  href: linkPropsFromCompany(entity).href,
  object: entity,
  type: "Company",
});

const workOrderSearchItem = (entity: validTypes["Workorder"]): SearchItem => ({
  label: entityConfig["Workorder"].toLabel(entity),
  href: linkForWorkorder(entity).href,
  object: entity,
  type: "Workorder",
});

export const searchIndex$ = pipe(
  allObjects$(),
  (o) => o,
  OE.map(({ assets, companies, users, units, workorders }) => [
    ...assets.map(assetSearchItem),
    ...companies.map(companySearchItem),
    ...users.map(userSearchItem),
    ...units.map(unitSearchItem),
    ...workorders.map(workOrderSearchItem),
  ])
);

export const fuseForSearchItems = flow(
  (items: SearchItem[]) =>
    new Fuse(items, {
      keys: ["label", 'object', 'id', 'type', 'object.name', 'object.id', 'object.title'],
      includeScore: true,
      threshold: 0.3,
        distance: 60,
      minMatchCharLength: 2,
        ignoreLocation: true,
      shouldSort: true,
    })
);
