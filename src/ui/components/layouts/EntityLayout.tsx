import { Col, Layout, Row, theme } from "antd";
import React from "react";

const { Content, Sider } = Layout;

export const EntityLayout = (
  props: React.PropsWithChildren<{ siderChildren: React.ReactNode }>
) => {
  const { children, siderChildren } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Content className={`min-h-[240x] bg-[${colorBgContainer}]`}>
        <Row>
          <Col className={"h-screen shadow p-4 bg-white"} flex={"360px"}>
            {siderChildren}
          </Col>
          <Col flex={1} className={"p-4"}>
            {children}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
