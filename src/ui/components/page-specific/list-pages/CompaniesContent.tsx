import {EntityLayout} from "@/ui/components/layouts/EntityListLayout";
import {TablePanel} from "@/ui/components/panels/table/TablePanel";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {pickCompanyColumns} from "@/lib/api/table/companyColumns";

export const CompaniesContent = ({
  companies,
}: {
  companies: validTypes["Company"][];
}) => {
  const dataSource = companies;
  const columns = pickCompanyColumns();

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
