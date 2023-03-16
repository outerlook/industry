import {BaseWidget} from '../common/widgets/BaseWidget';
import {Typography} from 'antd';

type LabelNumberProps = { n: number; label: string };
export const LabelledNumber = (props: LabelNumberProps) => {
  return (
    <BaseWidget >
      <div className={'p-2 flex flex-col items-center'}>
        <Typography.Title level={4}>{props.n}</Typography.Title>
        <Typography.Text className={'text-slate-600'}>{props.label}</Typography.Text>
      </div>
    </BaseWidget>
  );
};
