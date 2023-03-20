import {UserWorkload} from '../UserWorkload';
import type {Meta, StoryObj} from '@storybook/react';
import {Row, Space} from 'antd';
import type {validTypes} from '@services/api/validation/valid-types';
import {UsersAndWorkloads} from "../UsersAndWorkloads";

const meta = {
  component: UserWorkload,
  title: 'Widgets/Charts/UserWorkload',
} satisfies Meta<typeof UserWorkload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workloads: [
      { id: 'wl1', color: 'red' },
      { id: 'wl2', color: 'green' },
    ],
    user: { id: 'us1', name: 'Dave' },
    renderUserTooltip: u => <div>{u.name}</div>,
  },
  render: props => (
    <Row>
      <UserWorkload {...props} />
    </Row>
  ),
};

export const MultipleUser = () => {
  const workorders = [
    { id: 1, assignedUserIds: [1, 2] as any, title: 'Repair fan' },
    { id: 2, assignedUserIds: [1, 3] as any, title: 'Repair light' },
  ] as validTypes['Workorder'][];
  const users = [
    { id: 1, name: 'Dave' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Jane' },
  ] as validTypes['User'][];
  return (
    <Row>
      <Space  direction={'horizontal'} align={'end'}>
        <UsersAndWorkloads workorders={workorders} users={users} />
      </Space>
    </Row>
  );
};

