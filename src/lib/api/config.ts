import type {Entities, validEntities} from "@/lib/io-ts/valid-types";
import {getObjIndexableKeyFromKeys} from "@/lib/api/utils/indexable-keys-helper";
import {AimOutlined} from "@ant-design/icons";
import {linkTo} from "@/meta/__GENERATED__/routes";
import {flow} from "effect";
import {bindTo} from "fp-ts/Identity";

/**
 * @example
 * propStr('id')({id: 123, attr: "other"}) == "123"
 */
const propStr =
  <T>(key: keyof T) =>
  (obj: T) =>
    String(obj[key]);

const pickIdToStr = flow(propStr("id"), bindTo("id"));

export const entityConfig = {
  Asset: {
    toIndexableKey: getObjIndexableKeyFromKeys("asset", "id", "name", "model"),
    Icon: AimOutlined,
    toLabel: propStr("name"),
    toLink: flow(pickIdToStr, linkTo["/assets/:id"]),
  },
  User: {
    toIndexableKey: getObjIndexableKeyFromKeys("user", "id", "name"),
    Icon: AimOutlined,
    toLabel: propStr("name"),
    toLink: flow(pickIdToStr, linkTo["/users/:id"]),
  },
  Unit: {
    toIndexableKey: getObjIndexableKeyFromKeys("unit", "id", "name"),
    Icon: AimOutlined,
    toLabel: propStr("name"),
    toLink: flow(pickIdToStr, linkTo["/units/:id"]),
  },
  Company: {
    toIndexableKey: getObjIndexableKeyFromKeys("company", "id", "name"),
    Icon: AimOutlined,
    toLabel: propStr("name"),
    toLink: flow(pickIdToStr, linkTo["/companies/:id"]),
  },
  Workorder: {
    toIndexableKey: getObjIndexableKeyFromKeys("workorder", "id", "title"),
    Icon: AimOutlined,
    toLabel: propStr("title"),
    toLink: flow(pickIdToStr, linkTo["/workorders/:id"]),
  },
} satisfies {
  [key in Entities]: {
    toLabel: (entity: validEntities[key]) => string;
    toIndexableKey: (entity: validEntities[key]) => string;
    Icon: React.FC;
    toLink: (entity: validEntities[key]) => string;
  };
};
