import {Card, Col, Row} from "antd";
import React from "react";

type BasePanelProps = {
  titulo: string;
  children?: React.ReactNode;
  span?: number;
};

// panel like aws
export const BasePanel = (props: BasePanelProps) => {
  const { titulo, children, span = 8 } = props;
  return (
    <Col  span={span}>
      <Card  className={'h-full'} title={titulo} bordered={false}>
        {children}
      </Card>
    </Col>
  );
};
