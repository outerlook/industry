import { Button, Input, Layout, Space } from "antd";
import { DoubleRightOutlined, SearchOutlined } from "@ant-design/icons";
import { useObservable } from "../../../lib/react-rxjs/use-observable";
import { getMainSearchInputEffects } from "../../../lib/global-shortcuts/main-search-input-effects";

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Layout>
      <Header className="bg-gray-800 sticky h-16 w-full">
        <div className="flex justify-between items-center h-full mx-2">
          <Space direction={"horizontal"} size={"middle"}>
            <div className="text-white text-2xl font-bold">App</div>
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

function ServicesButton() {
  return (
    <Button
      // type="text"
      // className={'text-gray-100'}
      ghost
      icon={<DoubleRightOutlined />}
    >
      Serviços
    </Button>
  );
}

function SearchBar() {
  //  ( Icon INPUT [alt+/] )
  const { activate$, registerEl, shortcut } = getMainSearchInputEffects();

  useObservable(activate$);

  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder="O que estou buscando?"
      ref={(r) => registerEl(r?.input)}
      suffix={<div className="text-gray-400 text-xs">{shortcut}</div>}
    />
  );
}
