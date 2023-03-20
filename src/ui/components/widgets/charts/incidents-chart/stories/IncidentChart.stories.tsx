import { IncidentsChart } from '../IncidentsChart';
import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { historyToDays } from '../utils';
import type { validTypes } from '@services/api/validation/valid-types';

const meta = {
  title: 'Widgets/Charts/IncidentChart',
  component: IncidentsChart,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    statusColors: {
      unplannedStop: 'red',
      inOperation: 'green',
      inDowntime: 'red',
      plannedStop: 'blue',
      inAlert: 'yellow',
    } satisfies {
      [key in validTypes['Status']]: string;
    },
    days: historyToDays([
      { status: 'inAlert', timestamp: dayjs().add(-10).toDate() },
      { status: 'plannedStop', timestamp: dayjs().add(-7).toDate() },
      { status: 'inDowntime', timestamp: dayjs().add(-5).toDate() },
      { status: 'inOperation', timestamp: dayjs().add(-5).toDate() },
      { status: 'unplannedStop', timestamp: dayjs().add(-2).toDate() },
    ]),
  },
  // render: props => null,
  render: props => {
    return <IncidentsChart {...props} />;
  },
};
