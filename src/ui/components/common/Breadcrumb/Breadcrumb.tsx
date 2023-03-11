import {Breadcrumb as AntdBreadcrumb} from "antd";
import type {BreadcrumbItem} from "./schema-breadcrumbs";

export const Breadcrumb = (props: { items: BreadcrumbItem[] }) => {
  const { items } = props;
  return <AntdBreadcrumb items={items}></AntdBreadcrumb>;
};
