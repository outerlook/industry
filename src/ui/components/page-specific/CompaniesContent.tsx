import { EntityLayout } from "@/ui/components/layouts/EntityListLayout";
import { TablePanel } from "@/ui/components/panels/table/TablePanel";
import type { validTypes } from "@/lib/io-ts/valid-types";
import type { ColumnType } from "antd/es/table";
import { linkPropsFromCompany } from "@/lib/api/utils/link-from";
import { LinkCell } from "@/ui/components/common/Table/cells/LinkCell";

export const CompaniesContent = ({
  companies,
}: {
  companies: validTypes["Company"][];
}) => {
  const dataSource = companies;
  const columns = [
    {
      dataIndex: "name",
      title: "Name",
      render: (_: any, record) => {
        const { href, label } = linkPropsFromCompany(record, "name");
        return <LinkCell href={href}>{label}</LinkCell>;
      },
    },
  ] as ColumnType<validTypes["Company"]>[];

  return (
    <EntityLayout>
      <TablePanel
        titulo={"Companies"}
        tableProps={{
          dataSource,
          // @ts-ignore shame fixme
          columns,
        }}
      />
    </EntityLayout>
  );
};
