import type {validTypes} from "../../io-ts/valid-types";
import {entityConfig} from "@/lib/api/config";

// TODO: not good, specific props creating unnecessary coupling

const getLinkPropsFromIdentifiedObject =
  <E extends { id: string | number }>(
    getLinkFn: (arg: { id: string }) => string
  ) =>
  <K extends keyof E>(entity: Pick<E, K | "id">, labelKey: K = "name" as K) => {
    return {
      href: getLinkFn({ id: entity.id.toString() }),
      label: String(entity[labelKey]),
    };
  };

export const linkForCompany = getLinkPropsFromIdentifiedObject<
  validTypes["Company"]
>(entityConfig.Company.toLink);
export const linkForAsset = getLinkPropsFromIdentifiedObject<
  validTypes["Asset"]
>(entityConfig.Asset.toLink);
export const linkForUnit = getLinkPropsFromIdentifiedObject<validTypes["Unit"]>(
  entityConfig.Unit.toLink
);
export const linkForUser = getLinkPropsFromIdentifiedObject<validTypes["User"]>(
  entityConfig.User.toLink
);
export const linkForWorkorder = getLinkPropsFromIdentifiedObject<
  validTypes["Workorder"]
>(entityConfig.Workorder.toLink);
