import {linkFromCompany} from "@domain/lib/entities/link-from";
import {LinkCell} from "@ui/components/common/Table/cells/LinkCell";
import type {ColumnForData} from "@ui/components/common/Table/table-helper";
import {getUser} from "@services/api/tests/utils";
import type {validTypes} from "@services/api/validation/valid-types";

const dataSource = [
  getUser(),
  getUser(),
  getUser(),
  getUser({ name: "Mary Jane" }),
  getUser({ name: "Mary Jane" }),
  getUser({ name: "Mary Jane" }),
] as validTypes["User"][];
const columns = [
  { title: "Name", key: "name", dataIndex: "name" },
  { title: "Email", key: "email", dataIndex: "email" },
  {
    title: "Company",
    key: "companyId",
    dataIndex: "companyId",
    render: (value: validTypes["User"]["companyId"]) => {
      const { label, href } = linkFromCompany({
        id: value,
        name: "My company",
      });
      return (
        <LinkCell key={value} href={href}>
          {label}
        </LinkCell>
      );
    },
  },
] satisfies ColumnForData<typeof dataSource>;
export const testTableData = {
  dataSource,
  columns,
};
