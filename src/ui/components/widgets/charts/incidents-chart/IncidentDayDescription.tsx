import { Divider, Typography } from 'antd';
import dayjs from 'dayjs';
import { statusFormatters } from '@domain/lib/entities/renders/formatters/status';
import type { IncidentChartTypes } from './codecs';

export const IncidentDayDescription = <
  T extends IncidentChartTypes['IncidentDay']
>(props: {
  date: T['date'];
  events: T['events'];
  statusId: T['statusId'];
}) => {
  return (
    <div className={'flex flex-col'}>
      <Typography.Title level={4}>
        {dayjs(props.date).format('DD/MM/YYYY')}
      </Typography.Title>
      <Typography.Text className={'font-normal'}>
        {props.statusId ? statusFormatters.text(props.statusId) : 'No status'}
      </Typography.Text>
      {props.events.length > 0 ? (
        <ul>
          {props.events.map(evt => (
            <li key={evt.date.toISOString()}>
              {evt.date.format('HH:mm')} - {statusFormatters.text(evt.statusId)}
            </li>
          ))}
        </ul>
      ) : (
        <Typography.Text>No events on this day</Typography.Text>
      )}
    </div>
  );
};
