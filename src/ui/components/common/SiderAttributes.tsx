import {
  AttributeWidget,
  AttributeWidgetBaseProps,
} from '../widgets/AttributeWidget';
import { BaseWidget } from '../widgets/BaseWidget';
import { AttributesDivider } from './AttributesDivider';

export const SiderAttributes = ({
  attributes,
}: {
  attributes: AttributeWidgetBaseProps[];
}) => (
  <>
    <AttributesDivider />
    <BaseWidget>
      {attributes.map(({ label, value }) => (
        <AttributeWidget
          colProps={{ span: 12 }}
          key={value}
          label={label}
          value={value}
        />
      ))}
    </BaseWidget>
  </>
);
