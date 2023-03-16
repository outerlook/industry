import {EntityLayout} from "@ui/components/layouts/EntityListLayout";
import {TablePanel} from "@ui/components/panels/table/TablePanel";
import type {validTypes} from "@services/api/validation/valid-types";
import {pickWorkorderColumns} from "../../lib/entities/table/entity-columns/workorders-columns";

export const WorkordersContent = ({
  workorders,
}: {
  workorders: validTypes["Workorder"][];
}) => {
  const dataSource = workorders;
  const columns = pickWorkorderColumns();

  return (
    <EntityLayout title={"Work Orders"}>
      <TablePanel
        tableProps={{
          dataSource,
          columns,
        }}
      />
    </EntityLayout>
  );
};
