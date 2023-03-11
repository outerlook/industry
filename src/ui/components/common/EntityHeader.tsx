import {Breadcrumb} from "./Breadcrumb/Breadcrumb";
import {Col, Row, Space} from "antd";
import {PageTitle} from "./PageTitle";
import type {Action} from "./ActionButtons";
import { ActionButtons} from "./ActionButtons";

type EntityHeaderProps = {
  title: string;
  actions?: Action[];
  breadcrumbProps: React.ComponentProps<typeof Breadcrumb>;
};

export const EntityHeader = (props: EntityHeaderProps) => {
  const { breadcrumbProps } = props;
  return (
    <Space direction={"vertical"} size={"large"} className={"w-full"}>
      <Breadcrumb {...breadcrumbProps} />
      <Row justify={"space-between"}>
        <Col flex={1}>
          <PageTitle>{props.title}</PageTitle>
        </Col>
        <Col>{props.actions && <ActionButtons actions={props.actions} />}</Col>
      </Row>
    </Space>
  );
};
