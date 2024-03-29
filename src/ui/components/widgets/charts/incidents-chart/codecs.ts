import dayjs, { Dayjs } from 'dayjs';
import * as E from 'fp-ts/Either';
import * as t from 'io-ts';
import { pipe } from 'effect';

// spec
// ||||||||| that can be any color based on status
// if there's an event on a day, there's a blue dot on top of it

// scalars
const DateDayjs = new t.Type<Dayjs, any, Dayjs>(
  'DateDayjs',
  dayjs.isDayjs,
  (u, c) => {
    return dayjs.isDayjs(u) ? t.success(u) : t.failure(u, c);
  },
  a => a
);

/**
 * from string, but ensure
 * Format YYYY-MM-DD
 */
const dateString = new t.Type<string, string, unknown>(
  'dateString',
  (u): u is string => typeof u === 'string',
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      E.chain(s => {
        const day = dayjs(s);
        return day.isValid()
          ? t.success(day.format('YYYY-MM-DD'))
          : t.failure(u, c);
      })
    ),
  a => a
);

const StatusConfig = t.type({
  label: t.string,
  id: t.string,
  color: t.string,
});
type StatusConfig = t.TypeOf<typeof StatusConfig>;

const Event = t.type({
  statusId: t.string,
  date: DateDayjs,
});
type Event = t.TypeOf<typeof Event>;

const Day = t.type({
  events: t.array(Event),
  statusId: t.union([t.string, t.undefined]), // one status to represent this day, even if there are many kind of
  // events on a day
  date: dateString,
});
type Day = t.TypeOf<typeof Day>;

export const IncidentChartCodecs = {
  StatusConfig,
  Event,
  IncidentDay: Day,
};

export type IncidentChartTypes = {
  StatusConfig: StatusConfig;
  Event: Event;
  IncidentDay: Day;
};
