import { Card, Col, Row } from "antd";

type BasePanelProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  span?: number;
};

export const BasePanel = (props: BasePanelProps) => {
  const { title, children, span = 24 } = props;
  return (
    <Col span={span}>
      <Card size={"small"} bordered={false} className={"h-full"} title={title}>
        <Row>{children}</Row>
      </Card>
    </Col>
  );
};
