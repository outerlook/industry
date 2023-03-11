import { ColumnType } from "antd/es/table";
import { validTypes } from "@/lib/io-ts/valid-types";
import { pipe } from "effect";
import * as A from "fp-ts/Array";
import * as RA from "fp-ts/ReadonlyArray";
import { Lens } from "monocle-ts";
import { L } from "ts-toolbelt";
import {
  renderLink,
  renderPercentile,
  renderStatus,
} from "@/lib/api/table/cells/renderers";
import { linkForAsset } from "@/lib/api/utils/link-from";

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

const toDefaultIfEmpty =
  <A>(defaultValue: A[]) =>
  (array: A[]) =>
    array.length === 0 ? defaultValue : array;

type ColumnsThatHasThisKey<
  T extends ReadonlyArray<ColumnType<any>>,
  K extends string
> = L.Select<
  T,
  {
    readonly dataIndex: K;
  },
  "contains->"
>;

const getEntityColumnPicker =
  <
    Columns extends ReadonlyArray<ColumnType<any>>,
    DK extends KeysOfColumns<Columns> & string
  >(
    columns: Columns,
    defaultKeys: DK[]
  ) =>
  <K extends KeysOfColumns<Columns> & string = DK>(
    ...keys: K[]
  ): ColumnsThatHasThisKey<Columns, K> => {
    const selectedKeys = pipe(keys, toDefaultIfEmpty(defaultKeys));

    const columnDataIndexLens = Lens.fromProp<Columns[number]>()("dataIndex");

    const columnHasKey =
      (key: K) =>
      // @ts-ignore shame, but guarded by tests FIXME
      (column: Columns[number]): column is ColumnsThatHasThisKey<Columns, K> =>
        columnDataIndexLens.get(column) === key;

    const findColumnByKey = (key: KeysOfColumns<Columns>) =>
      pipe(columns as Columns, RA.findFirst(columnHasKey(key)));

    const selectedColumns = pipe(
      selectedKeys,
      A.map(findColumnByKey),
      A.compact
    );

    return selectedColumns as any; // guarded by tests FIXME
  };

export const pickAssetColumns = getEntityColumnPicker(assetColumns, [
  "name",
  "model",
  "healthscore",
  "status",
]);

type KeysOfColumns<T extends ReadonlyArray<ColumnType<any>>> = T[number]["key"];
