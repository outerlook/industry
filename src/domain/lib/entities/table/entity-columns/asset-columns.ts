import {renderPercentile, renderStatus, toReactLink,} from "../cells/renderers";
import {linkFromAsset} from "../../link-from";
import type {validTypes} from "@services/api/validation/valid-types";
import {generateColumnPicker} from "../columns";
import {pipe} from "effect";
import type {TypeSafeColumn} from "../column-type";
import {capitalize} from "lodash";

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
