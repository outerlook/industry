import type { IncidentChartTypes } from './codecs';
import * as E from "fp-ts/Either";
import { IncidentChartCodecs } from './codecs';
import * as I from 'fp-ts/Identity';
import type { validTypes } from '@services/api/validation/valid-types';
import { pipe } from 'effect';
import * as A from 'fp-ts/Array';
import dayjs from 'dayjs';
import * as O from 'fp-ts/Option';
import { groupByMap } from '@lib/utils/group-by';
import {getOrThrow} from "@lib/fp-ts/get-or-throw";
import {apply} from "fp-ts";

const { IncidentDay } = IncidentChartCodecs;
const ISO_ONLY_DATE = 'YYYY-MM-DD';

const groupHistoryByDate = (healthHistory: validTypes['HealthHistory'][]) =>
  pipe(
    healthHistory,
    groupByMap(p => dayjs(p.timestamp).format(ISO_ONLY_DATE))
  );

const toIncidentDays =
  (historyGroupedByDay: Record<string, validTypes['HealthHistory'][]>) =>
  (daysInRange: dayjs.Dayjs[]): Array<IncidentChartTypes['IncidentDay']> =>
    pipe(
      daysInRange,
      A.map(day => ({
        date: day,
        events: historyGroupedByDay[day.format(ISO_ONLY_DATE)] ?? [],
      })),
      A.map(v =>
        IncidentDay.decode({
          ...v,
          date: v.date.format(ISO_ONLY_DATE),
          statusId: pipe(
            v.events,
            A.match(
              // if there's no event on this day, the last event before it should be used to represent
              // this day
              () => lastEventBefore(v.date)(historyGroupedByDay),
              // if there are events, the most critical one should be used to represent this day
              v => pickMostCriticalEvent(v)
            )
          ),
        })
      ),
        A.traverse(E.)
    );

declare const lastEventBefore: (
  day: dayjs.Dayjs
) => (
  historyGroupedByDay: Record<string, validTypes['HealthHistory'][]>
) => (history: validTypes['HealthHistory'][]) => validTypes['Status'];

declare const pickMostCriticalEvent: (
  history: validTypes['HealthHistory'][]
) => validTypes['Status'];

export const historyToDays: (
  healthHistory: validTypes['HealthHistory'][]
) => IncidentChartTypes['IncidentDay'][] = healthHistory =>
  pipe(
    I.Do,
    // later to be able to get history events by date in format YYYY-MM-DD
    I.bind('historyGroupedByDay', () => groupHistoryByDate(healthHistory)),
    // Later to use to map and transform into day types of our range
    I.bind('daysInRange', () =>
      pipe(
        A.head(healthHistory),
        O.map(d => dayjs(d.timestamp)),
        O.map(getDaysSince),
        O.getOrElse(() => [] as dayjs.Dayjs[])
      )
    ),
    ({ daysInRange, historyGroupedByDay }) => {
      return toIncidentDays(historyGroupedByDay)(daysInRange);
    }
  );

declare const getDaysSince: (day: dayjs.Dayjs) => dayjs.Dayjs[];
