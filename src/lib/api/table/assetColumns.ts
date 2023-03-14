import {
  renderPercentile,
  renderStatus,
  toReactLink,
} from "@/lib/api/table/cells/renderers";
import { linkFromAsset } from "@/lib/api/utils/link-from";
import type { validTypes } from "@/lib/io-ts/valid-types";
import { generateColumnPicker } from "@/lib/api/table/columns";
import { pipe } from "effect";
import type { TypeSafeColumn } from "@/lib/api/table/column-type";
import { capitalize } from "lodash";

const assetColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, v) => pipe(v, linkFromAsset, toReactLink),
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
    render: capitalize,
  },
] as const satisfies ReadonlyArray<TypeSafeColumn<validTypes["Asset"]>>;
export const pickAssetColumns = generateColumnPicker(assetColumns, [
  "name",
  "model",
  "healthscore",
  "status",
]);
