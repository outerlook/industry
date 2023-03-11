import { renderLink } from "@/lib/api/table/cells/renderers";
import type { ColumnType } from "antd/es/table";
import type { validTypes } from "@/lib/io-ts/valid-types";
import { generateColumnPicker } from "@/lib/api/table/columns";
import { linkForWorkorder } from "@/lib/api/utils/link-from";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: renderLink(linkForWorkorder),
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Workorder"]>>;
export const pickWorkorderColumns = generateColumnPicker(columns, ["title"]);
