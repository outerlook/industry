import { CenteredLayout } from "../../layouts/CenteredLayout";
import { BasePanel } from "../../panels/BasePanel";
import { WidgetServicoLink } from "../../common/widgets/WidgetServicoLink";
import { BuildOutlined } from "@ant-design/icons";
import { List } from "antd";
import React from "react";
import { LinksExternosWidget } from "./LinksExternosWidget";

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
      <BasePanel span={12} titulo={"Last visited"}>
        <List
          dataSource={servicosELinks}
          size={"small"}
          grid={{ column: 2 }}
          split={true}
          renderItem={(props) => (
            <List.Item>
              <WidgetServicoLink colProps={{ span: 12 }} {...props} />
            </List.Item>
          )}
        />
      </BasePanel>
      <BasePanel span={12} titulo={"General status"} />
      <BasePanel span={12} titulo={"Work Orders"} />
      <BasePanel span={6} titulo={"External links"}>
        <LinksExternosWidget />
      </BasePanel>
      <BasePanel span={6} titulo={"More"} />
    </CenteredLayout>
  );
};
