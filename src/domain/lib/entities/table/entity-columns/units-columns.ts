import {renderLink} from "../cells/renderers";
import {linkFromUnit} from "../../link-from";
import type {ColumnType} from "antd/es/table";
import type {validTypes} from "@services/api/validation/valid-types";
import {generateColumnPicker} from "../columns";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderLink(linkFromUnit),
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Unit"]>>;
export const pickUnitColumns = generateColumnPicker(columns, ["name"]);
