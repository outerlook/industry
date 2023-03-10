import { Card, Col } from "antd";
import React from "react";

type BasePanelProps = {
  titulo: string;
  children?: React.ReactNode;
  span?: number;
};

export const BasePanel = (props: BasePanelProps) => {
  const { titulo, children, span = 24 } = props;
  return (
    <Col span={span}>
      <Card size={"small"} bordered={false} className={"h-full"} title={titulo}>
        {children}
      </Card>
    </Col>
  );
};
