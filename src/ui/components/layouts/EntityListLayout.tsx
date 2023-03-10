import {Layout, Space, theme} from "antd";
import {EntitySiderContent} from "@/ui/components/layouts/EntitySiderContent";

export const EntityLayout = (props: React.PropsWithChildren) => {
  const { children } = props;
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
          {children}
        </Space>
      </Layout.Content>
    </Layout>
  );
};
