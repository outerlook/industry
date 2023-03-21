import type { validTypes } from '@services/api/validation/valid-types';
import type { FormatFn } from './types';
import { flow } from 'effect';
import * as Match from '@effect/match';

export const statusFormatters = {
  text: flow(
    Match.value<string | validTypes['Status']>,
    Match.when('inAlert', () => 'In alert'),
    Match.when('inDowntime', () => 'Downtime'),
    Match.when('inOperation', () => 'Active'),
    Match.when('plannedStop', () => 'Planned Stop'),
    Match.when('unplannedStop', () => 'Unplanned Stop'),
    Match.orElse(() => 'Unknown status')
  ),
} satisfies Record<string, FormatFn<validTypes['Status']>>;
