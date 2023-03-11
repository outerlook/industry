import type { TableProps} from "antd";
import {Table} from "antd";

type BaseTableProps<RecordType> = {} & TableProps<RecordType>;
export const BaseTable = <RecordType extends {}>(
  props: BaseTableProps<RecordType>
) => {
  return <Table<RecordType> {...props} />;
};
