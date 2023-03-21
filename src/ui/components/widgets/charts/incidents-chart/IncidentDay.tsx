import { IncidentChartTypes } from './codecs';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { IncidentDayDescription } from './IncidentDayDescription';

export function IncidentDay<
  T extends IncidentChartTypes['IncidentDay']
>(props: { date: T['date']; color: string; events: T['events'], statusId: T['statusId'] }) {
  return (
    <Popover
      title={<IncidentDayDescription statusId={props.statusId} date={props.date} events={props.events} />}
    >
      <div
        style={{ backgroundColor: props.color }}
        className={`w-4 h-4 rounded flex items-center justify-center outline-3`}
      >
        {props.events.length > 0 && (
          <>
            <InfoCircleOutlined
              className={'text-slate-700'}
              style={{ fontSize: '8px', padding: '2px' }}
            />
          </>
        )}
      </div>
    </Popover>
  );
}
