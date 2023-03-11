import { Button, Layout, Space } from "antd";
import { SiteLogo } from "../SiteLogo";
import { SearchBar } from "@/ui/components/common/Header/SearchBar";
import { ServicesButton } from "@/ui/components/common/Header/ServicesButton";
import { LoggedMenu } from "@/ui/components/common/Header/LoggedMenu/LoggedMenu";
import { QuestionOutlined } from "@ant-design/icons";
import {notImplementedHalMsg} from "@/lib/utils/not-implemented";

const { Header } = Layout;

export const AppHeader = () => {
  const isLoggedIn = true; // replaceable
  return (
    <Layout className={"flex-none"}>
      <Header className="bg-gray-800 sticky h-12 fixed w-full">
        <div className="flex justify-between items-center h-full mx-2">
          <Space direction={"horizontal"} size={"middle"}>
            <a href={"/"} className="text-white text-2xl font-bold">
              <SiteLogo />
            </a>
            <ServicesButton></ServicesButton>
            <SearchBar />
          </Space>
          <Space>
            <Button onClick={notImplementedHalMsg('find help')} className={'bg-transparent border-none text-white'} shape={"circle"}>
              <QuestionOutlined />
            </Button>
            {isLoggedIn ? <LoggedMenu /> : "oh no"}
          </Space>
        </div>
      </Header>
    </Layout>
  );
};
