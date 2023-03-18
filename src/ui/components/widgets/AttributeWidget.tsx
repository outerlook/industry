import { BaseWidget, BaseWidgetProps } from './BaseWidget';
import { Space, Typography } from 'antd';
import { pipe } from 'effect';

export type AttributeWidgetBaseProps = { label: string; value: string };
export const AttributeWidget = (
  props: AttributeWidgetBaseProps & BaseWidgetProps
) => {
  const { value, label, ...restProps } = props;
  return (
    <BaseWidget {...restProps}>
      <Space direction={'vertical'}>
        <Typography.Text>{label}</Typography.Text>
        <Typography.Title level={4}>{value}</Typography.Title>
      </Space>
    </BaseWidget>
  );
};

export const toAttributeWidget =
   (props: AttributeWidgetBaseProps) =>
       (baseWidgetProps: BaseWidgetProps) =>
    pipe(
      props,
      ({ label, value }) => ({ label, value, ...baseWidgetProps }),
      AttributeWidget
    );
