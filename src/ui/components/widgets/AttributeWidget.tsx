import {BaseWidget} from "../common/widgets/BaseWidget";
import {Space, Typography} from "antd";

export const AttributeWidget = (
  props: { label: string; value: string } & React.ComponentProps<
    typeof BaseWidget
  >
) => {
  const { value, label, ...restProps } = props;
  return (
    <BaseWidget {...restProps}>
      <Space direction={"vertical"}>
        <Typography.Text>{label}</Typography.Text>
        <Typography.Title level={4}>{value}</Typography.Title>
      </Space>
    </BaseWidget>
  );
};
