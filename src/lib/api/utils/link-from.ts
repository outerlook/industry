import type { validTypes } from "../../io-ts/valid-types";
import { entityConfig } from "@/lib/api/config";

// TODO: not good, specific props creating unnecessary coupling

const getLinkPropsFromIdentifiedObject =
  <E extends { id: string | number }>(
    getLinkFn: (arg: { id: string }) => string
  ) =>
  <K extends keyof E>(labelKey: K) =>
  (entity: Pick<E, K | "id">) => {
    return {
      href: getLinkFn({ id: entity.id.toString() }),
      label: String(entity[labelKey]),
    };
  };

export const linkFromCompany = getLinkPropsFromIdentifiedObject<
  validTypes["Company"]
>(entityConfig.Company.toLink)("name");
export const linkFromAsset = getLinkPropsFromIdentifiedObject<
  validTypes["Asset"]
>(entityConfig.Asset.toLink)("name");
export const linkFromUnit = getLinkPropsFromIdentifiedObject<validTypes["Unit"]>(
  entityConfig.Unit.toLink
)("name");
export const linkFromUser = getLinkPropsFromIdentifiedObject<validTypes["User"]>(
  entityConfig.User.toLink
)("name");
export const linkFromWorkorder = getLinkPropsFromIdentifiedObject<
  validTypes["Workorder"]
>(entityConfig.Workorder.toLink)("title");
