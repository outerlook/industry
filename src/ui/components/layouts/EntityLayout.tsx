import { Col, Layout, Row, Space, theme } from "antd";
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
    <Layout className={"relative flex"}>
      <Content className={`flex flex-col bg-[${colorBgContainer}]`}>
        <Row className={"flex-1"}>
          {/* TODO: verify if SIDER is a better option */}
          <Col
            className={"shadow p-4 bg-white left-0 bottom-0 top-0"}
            flex={"360px"}
          >
            {siderChildren}
          </Col>
          <Col flex={1} className={"p-4 overflow-initial"}>
            <Space className={"w-full"} direction={"vertical"} size={"large"}>
              {children}
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
