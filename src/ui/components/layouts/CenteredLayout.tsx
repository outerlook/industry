import { Layout, Row, theme } from "antd";
import React from "react";

const { Content } = Layout;

export const CenteredLayout = ({ children }: React.PropsWithChildren) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className={`bg-[${colorBgContainer}]`}>
        <Content className={"p-4 w-[896px] mx-auto"}>
          <Row align={'stretch'} gutter={[16, 16]}>{children}</Row>
        </Content>
    </Layout>
  );
};
