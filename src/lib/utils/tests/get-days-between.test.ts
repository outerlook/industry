import { expect, test } from 'vitest';
import { getDaysBetween } from '../get-days-between';
import dayjs from 'dayjs';

test('getDaysBetween works', () => {
  const from = dayjs();
  const days = getDaysBetween(from.add(-10, 'd'))(from);
  expect(days.map(d => d.toISOString())).toMatchInlineSnapshot(`
    [
      "2023-03-10T03:00:00.000Z",
      "2023-03-11T03:00:00.000Z",
      "2023-03-12T03:00:00.000Z",
      "2023-03-13T03:00:00.000Z",
      "2023-03-14T03:00:00.000Z",
      "2023-03-15T03:00:00.000Z",
      "2023-03-16T03:00:00.000Z",
      "2023-03-17T03:00:00.000Z",
      "2023-03-18T03:00:00.000Z",
      "2023-03-19T03:00:00.000Z",
      "2023-03-20T03:00:00.000Z",
    ]
  `);
});
