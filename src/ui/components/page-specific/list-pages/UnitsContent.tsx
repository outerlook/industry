import {EntityLayout} from "@/ui/components/layouts/EntityListLayout";
import {TablePanel} from "@/ui/components/panels/table/TablePanel";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {pickUnitColumns} from "@/lib/api/table/unitsColumns";

export const UnitsContent = ({
  units,
}: {
  units: validTypes["Unit"][];
}) => {
  const dataSource = units;
  const columns = pickUnitColumns();

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
