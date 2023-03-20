import { IncidentChartTypes } from './codecs';
import { Typography } from 'antd';
import dayjs from 'dayjs';

export const IncidentDayDescription = <
  T extends IncidentChartTypes['IncidentDay']
>(props: {
  date: T['date'];
  events: T['events'];
}) => {
  return (
    <div>
      <Typography.Title level={4}>
        {dayjs(props.date).format('DD/MM/YYYY')}
      </Typography.Title>
      {props.events.length > 0 && (
        <ul>
          {props.events.map(evt => (
            <li key={evt.date.toISOString()}>
              {evt.date.format('HH:mm')} - {evt.statusId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
