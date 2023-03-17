import {BaseWidget} from "@ui/components/widgets/BaseWidget";
import {List, Space, Typography} from "antd";
import {PUBLIC_LINK_GITHUB_PROJECT, PUBLIC_LINK_STORYBOOK,} from "@lib/utils/environment-vars";
import {BookOutlined, GithubOutlined} from "@ant-design/icons";

const links = [
  {
    href: PUBLIC_LINK_STORYBOOK,
    title: "Components Storybook (chromatic)",
    icone: <BookOutlined />,
  },
  {
    href: PUBLIC_LINK_GITHUB_PROJECT,
    title: "Github project of this site",
    icone: <GithubOutlined />,
  },
] satisfies {
  href: string;
  icone: React.ReactNode;
  title: string;
}[];

/**
 * Widget contém links em lista vertical com ícones de cada link
 */
export function LinksExternosWidget() {
  return (
    <BaseWidget>
      <List
        dataSource={links}
        renderItem={(props) => (
          <List.Item>
            <Typography.Text>
              <a href={props.href}>
                <Space align={"baseline"} direction={"horizontal"}>
                  {props.icone}
                  <div>{props.title}</div>
                </Space>
              </a>
            </Typography.Text>
          </List.Item>
        )}
      />
    </BaseWidget>
  );
}
