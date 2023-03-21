import { IncidentsChart } from './IncidentsChart';
import type { validTypes } from '@services/api/validation/valid-types';
import { pipe } from 'effect';
import dayjs from 'dayjs';
import { historyToDays } from './utils';

export const LastWeeksDaysOfIncidents = (props: {
  weeksAgo: number;
  healthHistory: validTypes['HealthHistory'][];
}) => {
  const weeksAgo = pipe(
    dayjs(),
    d => d.startOf('w'),
    d => d.add(-1 * props.weeksAgo, 'w')
  );
  const statusColors = {
    unplannedStop: '#F56565',
    inOperation: '#68D391',
    inDowntime: '#4299E1',
    plannedStop: '#ED8936',
    inAlert: '#ED8936',
  } satisfies {
    [key in validTypes['Status']]: string;
  };
  const days = historyToDays(weeksAgo)(props.healthHistory);
  return <IncidentsChart days={days} statusColors={statusColors} />;
};
