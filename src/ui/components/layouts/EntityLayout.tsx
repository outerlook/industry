import {Layout, Space, theme} from "antd";

export const EntityLayout = (
  props: React.PropsWithChildren<{ siderChildren: React.ReactNode }>
) => {
  const { children, siderChildren } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider className={"relative "}>
      <Layout.Sider theme={'light'}  width={360} className={"shadow"}>
        <div className={"p-4"}>{siderChildren}</div>
      </Layout.Sider>
      <Layout.Content className={`bg-[${colorBgContainer}] p-4`}>
        <Space className={"w-full overflow-hidden"} direction={"vertical"} size={"large"}>
          {children}
        </Space>{" "}
      </Layout.Content>
    </Layout>
  );
};
