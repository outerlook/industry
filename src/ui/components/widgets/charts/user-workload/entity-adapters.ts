import type { validTypes } from '@services/api/validation/valid-types';
import * as A from 'fp-ts/Array';
import type { Workload, WorkUser } from './UserWorkload';
import { flow, pipe } from 'effect';
import { workorderLens } from '@domain/lib/entities/lenses/entity-lenses';
import * as I from 'fp-ts/Identity';
import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';

const workorderToWorkload = (workorder: validTypes['Workorder']): Workload => ({
  color: workorder.status === 'completed' ? 'green' : 'yellow',
  id: workorder.id.toString(),
});

const userEntityToWorkUser = (user: validTypes['User']): WorkUser => ({
  id: user.id.toString(),
  name: user.name,
});

/**
 * @description
 * Workorder has multiple assigned users
 * But we want to have something like {[key: userId]: Workorder[]}
 * So a single workorder can appear in multiple users' workload
 */
export const groupWorkordersByUserId: (
  workorders: validTypes['Workorder'][]
) => Record<string, validTypes['Workorder'][]> = flow(
  I.bindTo('workorders'),
  I.bind('users', () => workorderLens(['assignedUserIds']).get),
  I.bind('workloadEntries', ({ workorders }) =>
    pipe(
      workorders,
      A.chain(workorder =>
        pipe(
          workorder.assignedUserIds,
          A.map(userId => [userId, workorder] as const)
        )
      )
    )
  ),
  I.map(({ workloadEntries }) =>
    pipe(
      workloadEntries,
      A.reduce(
        {} as Record<string, validTypes['Workorder'][]>,
        (acc, [userId, workorder]) => ({
          ...acc,
          [userId]: [...(acc[userId] ?? []), workorder],
        })
      )
    )
  )
);

export const getWorkusersWithWorkloads = (
  workorders: validTypes['Workorder'][],
  users: validTypes['User'][]
) =>
  pipe(
    workorders,
    groupWorkordersByUserId,
    I.map(workloadsByUserId =>
      pipe(
        users,
        A.map(userEntityToWorkUser),
        A.map(
          workuser =>
            [
              workuser,
              pipe(
                workloadsByUserId,
                getWorkordersForUserId(workuser.id),
                A.map(workorderToWorkload)
              ),
            ] as const
        )
      )
    )
  );

const getWorkordersForUserId =
  (id: string) =>
  (workordersGroupedByUserId: Record<string, validTypes['Workorder'][]>) =>
    pipe(
      workordersGroupedByUserId,
      flow(
        R.lookup(id),
        O.getOrElseW(() => [] as never)
      )
    );
