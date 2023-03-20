import {validTypes} from '@services/api/validation/valid-types';
import * as O from 'fp-ts/Option';
import * as R from 'fp-ts/Record';
import {getWorkusersWithWorkloads} from './entity-adapters';
import {UserWorkload} from './UserWorkload';
import {groupBy} from '@lib/utils/group-by';
import {flow, pipe} from 'effect';
import {Space} from 'antd';
import {linkFromUser, linkFromWorkorder,} from '@domain/lib/entities/link-from';
import {toReactLink} from '@domain/lib/entities/table/cells/renderers';
import * as NEA from 'fp-ts/NonEmptyArray';

export const UsersAndWorkloads = (props: {
  workorders: validTypes['Workorder'][];
  users: validTypes['User'][];
}) => {
  const workusersAndWorkloads = getWorkusersWithWorkloads(
    props.workorders,
    props.users
  );
  const usersById = pipe(props.users, groupBy('id'));
  const workordersById = pipe(props.workorders, groupBy('id'));
  return (
    <Space direction={'horizontal'} align={'end'}>
      {workusersAndWorkloads.map(([workuser, workloads]) => (
        <UserWorkload
          renderUserTooltip={user =>
            pipe(
              usersById,
              R.lookup(user.id),
              O.map(flow(NEA.head, renderUserTooltip)),
              O.getOrElseW(() => user.name)
            )
          }
          renderWorkloadTooltip={workload =>
            pipe(
              workordersById,
              R.lookup(workload.id),
              O.map(flow(NEA.head, renderWorkOrderTooltip)),
              O.getOrElseW(() => undefined)
            )
          }
          user={workuser}
          key={workuser.id}
          workloads={workloads}
        />
      ))}
    </Space>
  );
};

const renderUserTooltip = (user: validTypes['User']) => (
  <div>{pipe(user, linkFromUser, toReactLink)}</div>
);

const renderWorkOrderTooltip = (workorder: validTypes['Workorder']) => (
  <div>{pipe(workorder, linkFromWorkorder, toReactLink)}</div>
);
