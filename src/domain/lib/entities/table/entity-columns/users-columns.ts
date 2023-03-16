import {toReactLink} from "../cells/renderers";
import type {validTypes} from "@services/api/validation/valid-types";
import {generateColumnPicker} from "../columns";
import {linkFromUser} from "../../link-from";
import {pipe} from "effect";
import type {TypeSafeColumn} from "../column-type";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, v) => pipe(v, linkFromUser, toReactLink),
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
] as const satisfies ReadonlyArray<TypeSafeColumn<validTypes["User"]>>;
export const pickUserColumns = generateColumnPicker(columns, ["name", "email"]);
