import type {ColumnsType} from "antd/es/table";

export type ColumnForData<Data extends any[]> = Data extends (infer U)[]
  ? ColumnsType<U>
  : never;
