import type { ColumnType } from 'antd/es/table';
import { pipe } from 'effect';
import * as A from 'fp-ts/Array';
import * as RA from 'fp-ts/ReadonlyArray';
import { Lens } from 'monocle-ts';
import type { L } from 'ts-toolbelt';

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
  'contains->'
>;

export const generateColumnPicker =
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
    // @ts-ignore fixme shame
    const selectedKeys = pipe(keys, toDefaultIfEmpty(defaultKeys));

    const columnKey = Lens.fromProp<Columns[number]>()('key');

    const columnHasKey =
      (key: K) =>
      // @ts-ignore shame, but guarded by tests FIXME
      (column: Columns[number]): column is ColumnsThatHasThisKey<Columns, K> =>
        columnKey.get(column) === key;

    const findColumnByKey = (key: KeysOfColumns<Columns>) =>
      // @ts-ignore guarded by tests FIXME
      pipe(columns as Columns, RA.findFirst(columnHasKey(key)));

    const selectedColumns = pipe(
      selectedKeys,
      A.map(findColumnByKey),
      A.compact
    );

    return selectedColumns as any; // shame, guarded by tests FIXME
  };

type KeysOfColumns<T extends ReadonlyArray<ColumnType<any>>> = T[number]['key'];
