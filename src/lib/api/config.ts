import type {Entities, validEntities} from "@/lib/io-ts/valid-types";
import {getObjectKeywordsFromKeys} from "@/lib/api/utils/indexable-keys-helper";
import {
    AimOutlined,
    DeploymentUnitOutlined,
    HomeOutlined,
    SettingOutlined,
    ToolOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {linkTo} from "@/meta/__GENERATED__/routes";
import {flow} from "effect";
import {bindTo} from "fp-ts/Identity";
import {debug} from "fp-ts-std";

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
        toKeywords: getObjectKeywordsFromKeys("id", "name", "model"),
        Icon: SettingOutlined,
        toLabel: propStr("name"),
        toLink: flow(pickIdToStr, linkTo["/assets/:id"]),
    },
    User: {
        toKeywords: getObjectKeywordsFromKeys("user", "id", "name"),
        Icon: UsergroupAddOutlined,
        toLabel: propStr("name"),
        toLink: flow(pickIdToStr, linkTo["/users/:id"]),
    },
    Unit: {
        toKeywords: getObjectKeywordsFromKeys("unit", "id", "name"),
        Icon: HomeOutlined,
        toLabel: propStr("name"),
        toLink: flow(pickIdToStr, linkTo["/units/:id"]),
    },
    Company: {
        toKeywords: getObjectKeywordsFromKeys("company", "id", "name"),
        Icon: DeploymentUnitOutlined,
        toLabel: propStr("name"),
        toLink: flow(pickIdToStr, linkTo["/companies/:id"]),
    },
    Workorder: {
        toKeywords: getObjectKeywordsFromKeys("workorder", "id", "title"),
        Icon: ToolOutlined,
        toLabel: propStr("title"),
        toLink: flow(pickIdToStr, linkTo["/workorders/:id"]),
    },
} satisfies {
    [key in Entities]: {
        toLabel: (entity: validEntities[key]) => string;
        toKeywords: (entity: validEntities[key]) => string[];
        Icon: React.FC;
        toLink: (entity: validEntities[key]) => string;
    };
};
