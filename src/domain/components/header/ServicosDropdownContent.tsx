import type {MenuProps} from "antd";
import {Dropdown, Space} from "antd";
import {servicesList} from "../../lib/entities/services-list";

export const ServicesDropdown = (props: React.PropsWithChildren) => {
  const { children } = props;
  const items = servicesList.map((item) => ({
    key: item.label,
    label: (
      <a href={item.href}>
        <Space direction={'horizontal'}>
          <item.Icon/>
          {item.label}</Space>
      </a>
    ),
  })) satisfies MenuProps["items"];

  return (
    <Dropdown menu={{ items }} placement="bottomCenter">
      {children}
    </Dropdown>
  );
};