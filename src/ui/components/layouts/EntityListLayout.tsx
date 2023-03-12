import {Layout, Space, theme} from "antd";
import {EntitySiderContent} from "@/ui/components/layouts/EntitySiderContent";
import {PageTitle} from "@/ui/components/common/PageTitle";

export const EntityLayout = (props: React.PropsWithChildren<{title: string}>) => {
  const { children, title } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className={"relative flex-1"} hasSider>
      <Layout.Sider style={{background: 'white'}} className={'shadow'} >
          <EntitySiderContent/>
      </Layout.Sider>
      <Layout.Content className={`bg-[${colorBgContainer}] p-4`}>
        <Space className={"w-full"} direction={"vertical"} size={"large"}>
            <PageTitle>{title}</PageTitle>
          {children}
        </Space>
      </Layout.Content>
    </Layout>
  );
};
