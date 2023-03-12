import React from "react";
import type { ColProps, RowProps} from "antd";
import {Col, Row} from "antd";

export type BaseWidgetProps = {colProps?: ColProps, rowProps?: RowProps};
export const BaseWidget = (props: React.PropsWithChildren<BaseWidgetProps>) => {
  const { children, colProps = {}, rowProps = {} } = props;
    const { span = 24, ...restProps } = colProps;


  return (
    <Col span={span} {...restProps}>
      <Row {...rowProps}>{children}</Row>
    </Col>
  );
};
