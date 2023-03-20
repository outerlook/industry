import {IncidentChartTypes} from './codecs';
import {AlertOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';
import {IncidentDayDescription} from "./IncidentDayDescription";

export function IncidentDay<
  T extends IncidentChartTypes['IncidentDay']
>(props: { date: T['date']; color: string; events: T['events'] }) {
  return (
    <div className={`bg-[${props.color}] w-4 h-4`}>
      {props.events.length > 0 && (
        <>
          <Tooltip>
            <IncidentDayDescription date={props.date} events={props.events} />
          </Tooltip>
          <AlertOutlined />
        </>
      )}
    </div>
  );
}

