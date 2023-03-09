import { BaseWidget, BaseWidgetProps } from "./BaseWidget";
import React from "react";
import { Space } from "antd";

export const WidgetServicoLink = (
  props: {
    title: string;
    icon: React.ReactNode;
    href: string;
  } & BaseWidgetProps
) => {
  const { title, icon, href, ...restProps } = props;

  return (
    <BaseWidget {...restProps}>
      <a href={href}>
        <Space  direction={"horizontal"}>
          {icon}
          <div>{title}</div>
        </Space>
      </a>
    </BaseWidget>
  );
};
