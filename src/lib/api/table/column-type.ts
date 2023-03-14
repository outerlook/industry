import type { ColumnType } from "antd/es/table";

export type TypeSafeColumn<T> = Omit<ColumnType<T>, "render" | "dataIndex"> &
  {
    // so that we can use the `dataIndex` as a key, and not generic between all
    [K in keyof T]: {
      dataIndex: K;
      render?: (
        value: T[K],
        record: T
      ) => ReturnType<NonNullable<ColumnType<T>["render"]>>;
    };
  }[keyof T];
