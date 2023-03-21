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
    <div className={'grid grid-rows-7 text-[12px] gap-1 justify-start grid-flow-col'}>
      <div>Sun</div>
      <div></div>
      <div></div>
      <div>Wed</div>
      <div></div>
      <div></div>
      <div>Sat</div>
      {days.map(d => {
        return (
          <IncidentDay
            key={d.date}
            date={d.date}
            statusId={d.statusId}
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

