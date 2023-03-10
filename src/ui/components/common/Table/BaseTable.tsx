import { Table, TableProps } from "antd";

type BaseTableProps<RecordType> = {} & TableProps<RecordType>;
export const BaseTable = <RecordType extends {}>(
  props: BaseTableProps<RecordType>
) => {
  return <Table {...props} />;
};
