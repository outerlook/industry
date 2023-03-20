import { Col, Space } from 'antd';
import { UserSvg } from './UserSvg';
import { WorkloadPile } from './WorkloadPile';
import type { ReactNode } from 'react';

export type Workload = { color: string; id: string };
export type HandleEvent<T> = (evt: T) => void;
export type Render<T> = (t: T) => ReactNode;
export type WorkUser = { id: string; name: string };
export const UserWorkload = (props: {
  onUserClick?: HandleEvent<WorkUser> | undefined;
  onWorkloadClick?: HandleEvent<Workload> | undefined;
  renderUserTooltip?: Render<WorkUser> | undefined;
  renderWorkloadTooltip?: Render<Workload> | undefined;
  user: WorkUser;
  workloads: Workload[];
}) => {
  const {
    onUserClick,
    onWorkloadClick,
    workloads,
    user,
    renderUserTooltip,
    renderWorkloadTooltip,
  } = props;
  return (
    <Col className={'justify-end'}>
      <Space direction={'vertical'}>
        <WorkloadPile
          onClick={onWorkloadClick}
          renderTooltip={renderWorkloadTooltip}
          workloads={workloads}
        />
        <UserSvg
          renderTooltip={renderUserTooltip}
          user={user}
          onClick={onUserClick}
        />
      </Space>
    </Col>
  );
};
