import {renderLink} from "@/lib/api/table/cells/renderers";
import {linkForCompany} from "@/lib/api/utils/link-from";
import type {ColumnType} from "antd/es/table";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {getEntityColumnPicker} from "@/lib/api/table/columns";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderLink(linkForCompany),
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Company"]>>;
export const pickCompanyColumns = getEntityColumnPicker(columns, ["name"]);
