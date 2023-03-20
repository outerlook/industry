import type {IncidentChartTypes} from './codecs';
import {IncidentChartCodecs} from './codecs';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import * as R from 'fp-ts/Record';
import * as t from 'io-ts';
import * as E from 'fp-ts/Either';
import * as I from 'fp-ts/Identity';
import type {validTypes} from '@services/api/validation/valid-types';
import {flow, pipe} from 'effect';
import * as A from 'fp-ts/Array';
import dayjs from 'dayjs';
import {Grouped} from '@lib/utils/group-by';
import {getOrThrow} from '@lib/fp-ts/get-or-throw';
import type {NonEmptyArray} from 'fp-ts/NonEmptyArray';
import * as NEA from 'fp-ts/NonEmptyArray';
import {byNth} from '@lib/fp-ts/ord/tuple';
import {statusCriticalOrd} from '@domain/lib/entities/ord/statusCriticalOrd';
import {healthHistoryDateOrd} from '@domain/lib/entities/ord/health-history';
import {getDaysBetween} from '@lib/utils/get-days-between';

const { IncidentDay } = IncidentChartCodecs;
const ISO_ONLY_DATE = 'YYYY-MM-DD';

const groupHistoryByDate = (healthHistory: validTypes['HealthHistory'][]) =>
  pipe(
    healthHistory,
    NEA.groupBy(p => dayjs(p.timestamp).format(ISO_ONLY_DATE))
  );

const toIncidentDays =
  (historyGroupedByDay: Grouped<validTypes['HealthHistory'], string>) =>
  (daysInRange: dayjs.Dayjs[]): Array<IncidentChartTypes['IncidentDay']> =>
    pipe(
      daysInRange,
      A.map(day => {
        const formattedDay = day.format(ISO_ONLY_DATE);
        const events = historyGroupedByDay[formattedDay] ?? [];
        return {
          date: formattedDay,
          events: events.map(e => ({
            statusId: e.status,
            date: dayjs(e.timestamp),
          })),
          statusId: pipe(
            events,
            A.matchW(
              // if there's no event on this day, the last event before it should be used to represent
              // this day
              () => lastEventBefore(day)(historyGroupedByDay),
              // if there are events, the most critical one should be used to represent this day
              e => pickMostCriticalEvent(e)
            )
          ),
        } as t.TypeOf<typeof IncidentDay>;
      }),
      A.map(IncidentDay.decode),
      A.sequence(E.Applicative), // Either<Errors, Result>[] -> Either<Errors, Result[]>
      getOrThrow // in this we are abdicating of handling our error
    );

const lastEventBefore =
  (day: dayjs.Dayjs) =>
  (historyGroupedByDay: Grouped<validTypes['HealthHistory'], string>) => {
    return pipe(
      historyGroupedByDay,
      R.toEntries, // -> [dateStr, obj]
      A.filter(([datestr]) => dayjs(datestr).isBefore(day)), // removes days after what we want
      A.sort(byNth(S.Ord, 0)), // sort by datestr
      A.last,
      E.fromOption(() => ({ type: 'NO_DAY_BEFORE_CHOOSEN_DAY' as const })),
      E.map(
        flow(
          ([, history]) => history,
          NEA.sort(healthHistoryDateOrd),
          NEA.last,
          a => a.status
        )
      )
    );
  };

const pickMostCriticalEvent: (
  history: NonEmptyArray<validTypes['HealthHistory']>
) => validTypes['Status'] = history =>
  pipe(
    history,
    NEA.map(n => n.status),
    NEA.sort(statusCriticalOrd),
    NEA.last
  );

const today = dayjs();
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
        O.map(getDaysBetween(today)),
        O.getOrElse(() => [] as dayjs.Dayjs[])
      )
    ),
    ({ daysInRange, historyGroupedByDay }) => {
      return toIncidentDays(historyGroupedByDay)(daysInRange);
    }
  );
