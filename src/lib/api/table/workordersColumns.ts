import { renderLink } from "@/lib/api/table/cells/renderers";
import type { ColumnType } from "antd/es/table";
import type { validTypes } from "@/lib/io-ts/valid-types";
import { getEntityColumnPicker } from "@/lib/api/table/columns";
import { linkForWorkorder } from "@/lib/api/utils/link-from";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderLink(linkForWorkorder),
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Workorder"]>>;
export const pickWorkorderColumns = getEntityColumnPicker(columns, [
  "name",
  "email",
]);
