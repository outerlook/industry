import type { IncidentChartTypes } from './codecs';
import { IncidentDay } from './IncidentDay';

export const IncidentsChart = <
  T extends IncidentChartTypes['IncidentDay']
>(props: {
  days: T[];
  statusColors: Record<T['statusId'], string>;
}) => {
  const { days, statusColors } = props;
  return (
    <div className={'grid grid-rows-7 grid-flow-col'}>
      {days.map(d => {
        return (
          <IncidentDay
            key={d.date}
            date={d.date}
            color={
              statusColors[d.statusId as keyof typeof statusColors] ?? 'gray'
            }
            events={d.events}
          />
        );
      })}
    </div>
  );
};
