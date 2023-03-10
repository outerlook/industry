import React from "react";
import {Col, ColProps, Row, RowProps} from "antd";

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
