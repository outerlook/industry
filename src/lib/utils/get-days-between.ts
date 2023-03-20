import dayjs from 'dayjs';
import _ from 'lodash';

export const getDaysBetween: (
  d1: dayjs.Dayjs
) => (d2: dayjs.Dayjs) => dayjs.Dayjs[] = d1 => d2 => {
  const [from, to] = d1.isBefore(d2) ? [d1, d2] : [d2, d1]; // min to max day, so doesn't matter the argument order

  const daysDiff = to.diff(from, 'd');
  const range = _.range(0, daysDiff + 1); // must include the last day
  return range.map(n => from.startOf('d').add(n, 'd'));
};
