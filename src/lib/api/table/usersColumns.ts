import {renderLink} from "@/lib/api/table/cells/renderers";
import type {ColumnType} from "antd/es/table";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {generateColumnPicker} from "@/lib/api/table/columns";
import {linkForUser} from "@/lib/api/utils/link-from";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderLink(linkForUser),
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["User"]>>;
export const pickUserColumns = generateColumnPicker(columns, [
  "name",
  "email",
]);
