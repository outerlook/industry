import type {IncidentChartTypes} from './codecs';
import {IncidentChartCodecs} from './codecs';
import * as S from 'fp-ts/string';
import * as R from 'fp-ts/Record';
import type * as t from 'io-ts';
import * as E from 'fp-ts/Either';
import * as I from 'fp-ts/Identity';
import type {validTypes} from '@services/api/validation/valid-types';
import {flow, pipe} from 'effect';
import * as A from 'fp-ts/Array';
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import type {Grouped} from '@lib/utils/group-by';
import type {NonEmptyArray} from 'fp-ts/NonEmptyArray';
import * as NEA from 'fp-ts/NonEmptyArray';
import {byNth} from '@lib/fp-ts/ord/tuple';
import {statusCriticalOrd} from '@domain/lib/entities/ord/statusCriticalOrd';
import {healthHistoryDateOrd} from '@domain/lib/entities/ord/health-history';
import {getDaysBetween} from '@lib/utils/get-days-between';
import {traceWithValue} from 'fp-ts-std/Debug';
import {formatValidationErrors} from 'io-ts-reporters';

const { IncidentDay } = IncidentChartCodecs;
const ISO_ONLY_DATE = 'YYYY-MM-DD';

const groupHistoryByDate = (healthHistory: validTypes['HealthHistory'][]) =>
  pipe(
    healthHistory,
    NEA.groupBy(p => dayjs(p.timestamp).format(ISO_ONLY_DATE))
  );

const toIncidentDays =
  (historyGroupedByDay: Grouped<validTypes['HealthHistory'], string>) =>
  (daysInRange: Dayjs[]): Array<IncidentChartTypes['IncidentDay']> =>
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
              e => E.right(pickMostCriticalEvent(e))
            ),
            E.mapLeft((a: any) => undefined),
            E.toUnion
          ),
        } as t.TypeOf<typeof IncidentDay>;
      }),
      traceWithValue('here'),
      A.map(IncidentDay.decode),
      A.sequence(E.Applicative), // Either<Errors, Result>[] -> Either<Errors, Result[]>
      E.getOrElseW(e => {
        throw formatValidationErrors(e); // choosing to throw here, but we could take this on
      })
    );

const lastEventBefore =
  (day: Dayjs) =>
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
export const historyToDays =
  (startDate: Dayjs) =>
  (
    healthHistory: validTypes['HealthHistory'][]
  ): IncidentChartTypes['IncidentDay'][] =>
    pipe(
      I.Do,
      // later to be able to get history events by date in format YYYY-MM-DD
      I.bind('historyGroupedByDay', () => groupHistoryByDate(healthHistory)),
      // Later to use to map and transform into day types of our range
      I.bind('daysInRange', () => pipe(startDate, getDaysBetween(today))),
      ({ daysInRange, historyGroupedByDay }) => {
        return toIncidentDays(historyGroupedByDay)(daysInRange);
      }
    );
