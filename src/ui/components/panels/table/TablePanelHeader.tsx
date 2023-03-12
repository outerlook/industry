import {useTableStateContext} from "./table-state";
import {Col, Pagination, Row, Typography} from "antd";

export const TablePanelHeader = (props: { title?: string | undefined }) => {
  const { title = "Registers" } = props;
  const {
    state: { totalItems, page, pageSize },
    setPage,
  } = useTableStateContext();

  return (
    <div className={"p-3 border-bottom-2 border-solid border-gray-100"}>
      <Row>
        <Typography.Title level={4}>
          {title} ({totalItems})
        </Typography.Title>
      </Row>
      <Row>
        <Col className={'text-slate-500'} flex={1}>[Imagine some filters here] {/*TODO*/}</Col>
        <Col>
          <Pagination
            size={"small"}
            pageSize={pageSize}
            current={page}
            total={totalItems}
            onChange={(page) => setPage(page)}
          />
        </Col>
      </Row>
    </div>
  );
};
