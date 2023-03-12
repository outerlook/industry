import {renderLink, renderPercentile, renderStatus,} from "@/lib/api/table/cells/renderers";
import {linkForAsset} from "@/lib/api/utils/link-from";
import type {ColumnType} from "antd/es/table";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {generateColumnPicker} from "@/lib/api/table/columns";

const assetColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: renderLink(linkForAsset),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: renderStatus,
  },
  {
    title: "Health",
    dataIndex: "healthscore",
    key: "healthscore",
    render: renderPercentile,
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
  },
] as const satisfies ReadonlyArray<ColumnType<validTypes["Asset"]>>;
export const pickAssetColumns = generateColumnPicker(assetColumns, [
  "name",
  "model",
  "healthscore",
  "status",
]);
