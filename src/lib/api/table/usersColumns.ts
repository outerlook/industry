import {toReactLink} from "@/lib/api/table/cells/renderers";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {generateColumnPicker} from "@/lib/api/table/columns";
import {linkFromUser} from "@/lib/api/utils/link-from";
import {pipe} from "effect";
import type {TypeSafeColumn} from "@/lib/api/table/column-type";

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
