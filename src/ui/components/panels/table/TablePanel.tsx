import {Card, Col} from "antd";
import {BaseTable} from "../../common/Table/BaseTable";
import {TablePanelHeader} from "./TablePanelHeader";
import {TableStateProvider, useTableStateContext} from "./table-state";
import React from "react";
import produce from "immer";

const WithTableState = <T extends {}>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    return (
      <TableStateProvider>
        <Component {...props} />
      </TableStateProvider>
    );
  };
};

type TablePanelProps<T extends {}> = {
  span?: number;
  tableProps: React.ComponentProps<typeof BaseTable<T>>;
  title?: string
};
const TablePanelToBeWrapped = <T extends {}>(props: TablePanelProps<T>) => {
  const { span = 24, title, tableProps } = props;

  const {
    state: { pageSize, page },
    setTotalItems,
  } = useTableStateContext();

  const totalItems = React.useMemo(
      () => tableProps.dataSource?.length ?? 0,
      [tableProps.dataSource?.length]
  );
  React.useEffect(() => {
    setTotalItems(totalItems);
  }, [totalItems, setTotalItems]);

  const injectedTableProps = produce(tableProps, (draft) => {
    draft.pagination = {
      pageSize,
      current: page,
      position: [], // no position
      ...draft.pagination,
    };
  });

  // we should control
  return (
      <Col span={span}>
        <Card
            size={"small"}
            cover={<TablePanelHeader title={title} />}
            bordered={false}
            className={"h-full"}
        >
          <BaseTable {...injectedTableProps} />
        </Card>
      </Col>
  );
};
export const TablePanel = WithTableState(TablePanelToBeWrapped) as typeof TablePanelToBeWrapped; // to be used with generics
