import { EntityLayout } from '@ui/components/layouts/EntityListLayout';
import { TablePanel } from '@ui/components/panels/table/TablePanel';
import type { validTypes } from '@services/api/validation/valid-types';
import { pickUserColumns } from '../../lib/entities/table/entity-columns/users-columns';

export const UsersContent = ({ users }: { users: validTypes['User'][] }) => {
  const dataSource = users;
  const columns = pickUserColumns();

  return (
    <EntityLayout title={'Users'}>
      <TablePanel
        tableProps={{
          dataSource,
          columns,
        }}
      />
    </EntityLayout>
  );
};
