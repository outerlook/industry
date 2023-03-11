import {EntityLayout} from "@/ui/components/layouts/EntityListLayout";
import {TablePanel} from "@/ui/components/panels/table/TablePanel";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {pickWorkorderColumns} from "@/lib/api/table/workordersColumns";

export const UnitsContent = ({
  workorders,
}: {
  workorders: validTypes["Workorder"][];
}) => {
  const dataSource = workorders;
  const columns = pickWorkorderColumns();

  return (
    <EntityLayout>
      <TablePanel
        tableProps={{
          dataSource,
          columns,
        }}
      />
    </EntityLayout>
  );
};
