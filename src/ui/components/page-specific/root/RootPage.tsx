import { CenteredLayout } from "../../layouts/CenteredLayout";
import { BasePanel } from "../../panels/BasePanel";
import { WidgetServicoLink } from "../../widgets/WidgetServicoLink";
import { BuildOutlined } from "@ant-design/icons";
import { List } from "antd";
import React from "react";

export const RootPage = () => {
  const servicosELinks = [
    {
      title: "Ativos",
      icon: <BuildOutlined />,
      href: "/",
    },
    {
      title: "Ativos",
      icon: <BuildOutlined />,
      href: "/",
    },
    {
      title: "Ativos",
      icon: <BuildOutlined />,
      href: "/",
    },
    {
      title: "Ativos",
      icon: <BuildOutlined />,
      href: "/",
    },
  ];
  return (
    <CenteredLayout>
      <BasePanel span={12} titulo={"Últimos acessados"}>
        <List
          dataSource={servicosELinks}
          size={"small"}
          grid={{column: 2, }}
          split={true}
          renderItem={(props) => (
            <List.Item >
              <WidgetServicoLink span={12} {...props} />
            </List.Item>
          )}
        />
      </BasePanel>
      <BasePanel span={12} titulo={"Status Gerais"} />
      <BasePanel span={12} titulo={"Ordem de serviços ativas"} />
      <BasePanel span={6} titulo={"Alguns numeros"} />
      <BasePanel span={6} titulo={"Outros numeros"} />
    </CenteredLayout>
  );
};
