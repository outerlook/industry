import {EntityLayout} from "@ui/components/layouts/EntityListLayout";
import {TablePanel} from "@ui/components/panels/table/TablePanel";
import type {validTypes} from "@services/api/validation/valid-types";
import {pickCompanyColumns} from "../../lib/entities/table/entity-columns/company-columns";

export const CompaniesContent = ({
  companies,
}: {
  companies: validTypes["Company"][];
}) => {
  const dataSource = companies;
  const columns = pickCompanyColumns();

  return (
    <EntityLayout title={'Companies'}>
      <TablePanel
        tableProps={{
          dataSource,
          columns,
        }}
      />
    </EntityLayout>
  );
};
