import {renderLink} from "../cells/renderers";
import type {ColumnType} from "antd/es/table";
import type {validTypes} from "@services/api/validation/valid-types";
import {generateColumnPicker} from "../columns";
import {linkFromWorkorder} from "../../link-from";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: renderLink(linkFromWorkorder),
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Workorder"]>>;
export const pickWorkorderColumns = generateColumnPicker(columns, ["title"]);
