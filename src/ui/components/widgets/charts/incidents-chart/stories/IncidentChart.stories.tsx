import {IncidentsChart} from '../IncidentsChart';
import type {Meta, StoryObj} from '@storybook/react';
import dayjs from 'dayjs';
import {historyToDays} from '../utils';
import type {validTypes} from '@services/api/validation/valid-types';
import {pipe} from "effect";

const meta = {
  title: 'Widgets/Charts/IncidentChart',
  component: IncidentsChart,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const monthsAgo = pipe(
  dayjs(),
  d => d.startOf('w'),
  d => d.add(-8, 'w')
);
export const Default: Story = {
  args: {
    statusColors: {
      unplannedStop: '#F56565',
      inOperation: '#68D391',
      inDowntime: '#4299E1',
      plannedStop: '#ED8936',
      inAlert: '#ED8936',
    } satisfies {
      [key in validTypes['Status']]: string;
    },
    days: historyToDays(monthsAgo)([
      { status: 'inAlert', timestamp: dayjs().add(-10, 'd').toDate() },
      { status: 'plannedStop', timestamp: dayjs().add(-7, 'd').toDate() },
      { status: 'inDowntime', timestamp: dayjs().add(-5, 'd').toDate() },
      { status: 'inOperation', timestamp: dayjs().add(-5, 'd').toDate() },
      { status: 'unplannedStop', timestamp: dayjs().add(-2, 'd').toDate() },
    ]),
  },
  // render: props => null,
  render: props => {
    return <IncidentsChart {...props} />;
  },
};
