import { BaseWidget } from "../BaseWidget";
import { Image, Space, Typography } from "antd";

import React from "react";

const { Title } = Typography;

/**
 * |``| Titulo
 * |__| Extra
 */
export const WidgetPresentation = (
  props: React.PropsWithChildren<{
    extra?: React.ReactNode;
    image?: string;
    title: string;
  }>
) => {
  return (
    <BaseWidget rowProps={{ gutter: 8 }}>
      {props.image && (
        <BaseWidget colProps={{ flex: "96px" }}>
          <Image
            className={"object-cover"}
            // TODO: Optimize image on server
            src={props.image}
            width={96}
            height={96}
          />
        </BaseWidget>
      )}
      <BaseWidget colProps={{ flex: 1 }}>
        <div className={"p-2"}>
          <Space direction={"vertical"}>
            <Title level={3}>{props.title}</Title>
            <Title level={4}>{props.extra}</Title>
          </Space>
        </div>
      </BaseWidget>
    </BaseWidget>
  );
};
