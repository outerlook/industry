import {renderLink} from "../cells/renderers";
import {linkFromCompany} from "../../link-from";
import type {ColumnType} from "antd/es/table";
import type {validTypes} from "@services/api/validation/valid-types";
import {generateColumnPicker} from "../columns";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderLink(linkFromCompany),
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Company"]>>;
export const pickCompanyColumns = generateColumnPicker(columns, ["name"]);
