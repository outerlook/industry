import type {validTypes} from "@/lib/io-ts/valid-types";
import {linkFromAsset, linkFromCompany, linkFromUnit, linkFromUser, linkFromWorkorder,} from "@/lib/api/utils/link-from";
import {entityConfig} from "@/lib/api/config";
import {allObjects$} from "@/lib/api/fetch/fetch-every-object";
import * as OE from "fp-ts-rxjs/ObservableEither";
import {pipe} from "effect";
import type {SearchItem} from "@/lib/search-service/search-item";

const assetSearchItem = (entity: validTypes["Asset"]): SearchItem => ({
  label: entityConfig["Asset"].toLabel(entity),
  href: linkFromAsset(entity).href,
    keywords: entityConfig["Asset"].toKeywords(entity),
  object: entity,
  type: "Asset",
});

const userSearchItem = (entity: validTypes["User"]): SearchItem => ({
  label: entityConfig["User"].toLabel(entity),
  href: linkFromUser(entity).href,
  object: entity,
  type: "User",
});

const unitSearchItem = (entity: validTypes["Unit"]): SearchItem => ({
  label: entityConfig["Unit"].toLabel(entity),
  href: linkFromUnit(entity).href,
  object: entity,
  type: "Unit",
});

const companySearchItem = (entity: validTypes["Company"]): SearchItem => ({
  label: entityConfig["Company"].toLabel(entity),
  href: linkFromCompany(entity).href,
  object: entity,
  type: "Company",
});

const workOrderSearchItem = (entity: validTypes["Workorder"]): SearchItem => ({
  label: entityConfig["Workorder"].toLabel(entity),
  href: linkFromWorkorder(entity).href,
  object: entity,
  type: "Workorder",
});

export const entitiesSearchIndex$ = pipe(
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

