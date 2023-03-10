import type { validTypes } from "../../io-ts/valid-types";
import { linkTo } from "../../../meta/__GENERATED__/routes";

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

export const linkPropsFromCompany = getLinkPropsFromIdentifiedObject<
  validTypes["Company"]
>(linkTo["/companies/:id"]);
export const linkPropsForAsset = getLinkPropsFromIdentifiedObject<
  validTypes["Asset"]
>(linkTo["/assets/:id"]);
export const linkForUnit = getLinkPropsFromIdentifiedObject<validTypes["Unit"]>(
  linkTo["/units/:id"]
);
export const linkForUser = getLinkPropsFromIdentifiedObject<validTypes["User"]>(
  linkTo["/users/:id"]
);
export const linkForWorkorder = getLinkPropsFromIdentifiedObject<
  validTypes["Workorder"]
>(linkTo["/workorders/:id"]);
