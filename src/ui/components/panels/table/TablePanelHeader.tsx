import { useTableStateContext } from "./table-state";
import { Col, Pagination, Row, Typography } from "antd";

export const TablePanelHeader = () => {
  const {
    state: { totalItems, page, pageSize },
    setPage,
  } = useTableStateContext();
  return (
    <div className={"p-3 border-bottom-2 border-solid border-gray-100"}>
      <Row>
        <Typography.Title level={4}>Registros ({totalItems})</Typography.Title>
      </Row>
      <Row>
        <Col flex={1}>[Futuros filtros] {/*TODO*/}</Col>
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
