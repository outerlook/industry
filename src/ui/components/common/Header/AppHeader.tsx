import {Layout, Space} from "antd";
import {SiteLogo} from "../SiteLogo";
import {SearchBar} from "@/ui/components/common/Header/SearchBar";
import {ServicesButton} from "@/ui/components/common/Header/ServicesButton";

const { Header } = Layout;

export const AppHeader = () => {
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
          <div className="flex items-center">
            <div className="text-white text-xl font-bold">User</div>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

