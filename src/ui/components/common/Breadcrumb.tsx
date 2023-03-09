import { Breadcrumb as AntdBreadcrumb } from "antd";

export const Breadcrumb = () => {
  return (
    <AntdBreadcrumb>
      <AntdBreadcrumb.Item>Home</AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>
        <a href="">Application Center</a>
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>
        <a href="">Application List</a>
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>An Application</AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  );
};
