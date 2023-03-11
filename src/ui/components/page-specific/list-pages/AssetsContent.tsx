import {EntityLayout} from "@/ui/components/layouts/EntityListLayout";
import {TablePanel} from "@/ui/components/panels/table/TablePanel";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {pickAssetColumns} from "@/lib/api/table/assetColumns";

export const AssetsContent = ({
  assets,
}: {
  assets: validTypes["Asset"][];
}) => {
  const dataSource = assets;
  const columns = pickAssetColumns();

  return (
    <EntityLayout title={"Assets"}>
      <TablePanel
        tableProps={{
          dataSource,
          columns,
        }}
      />
    </EntityLayout>
  );
};
