import {EntityLayout} from "@ui/components/layouts/EntityListLayout";
import {TablePanel} from "@ui/components/panels/table/TablePanel";
import type {validTypes} from "@services/api/validation/valid-types";
import {pickUnitColumns} from "../../lib/entities/table/entity-columns/units-columns";

export const UnitsContent = ({
  units,
}: {
  units: validTypes["Unit"][];
}) => {
  const dataSource = units;
  const columns = pickUnitColumns();

  return (
    <EntityLayout title={"Units"}>
      <TablePanel
        tableProps={{
          dataSource,
          columns,
        }}
      />
    </EntityLayout>
  );
};
