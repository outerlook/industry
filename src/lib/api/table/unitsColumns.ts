import {renderLink} from "@/lib/api/table/cells/renderers";
import {linkFromUnit} from "@/lib/api/utils/link-from";
import type {ColumnType} from "antd/es/table";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {generateColumnPicker} from "@/lib/api/table/columns";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderLink(linkFromUnit),
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Unit"]>>;
export const pickUnitColumns = generateColumnPicker(columns, ["name"]);
