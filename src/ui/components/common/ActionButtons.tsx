import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export type Action = {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

export function ActionButtons(props: { actions: Action[] }) {
  // buttons side by side
  // more than 2 should add a dropdown
  const { actions } = props;
  const buttonActions = actions.slice(0, 2);
  const dropdownActions = actions.slice(2);

  const items = dropdownActions.map((action, index) => ({
    key: index,
    label: action.label,
    icon: action.icon,
    onClick: action.onClick,
  })) satisfies MenuProps["items"];

  return (
    <Space direction={"horizontal"}>
      {buttonActions.map((action, index) => {
        return (
          <Button key={index} onClick={action.onClick} type={"primary"}>
            {action.label}
          </Button>
        );
      })}
      {items.length > 0 && (
        <Dropdown menu={{ items }}>
          <Space>
            <Button>
              More <DownOutlined />
            </Button>
          </Space>
        </Dropdown>
      )}
    </Space>
  );
}
