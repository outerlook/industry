import type { Meta, StoryObj } from "@storybook/react";
import { BaseTable } from "../BaseTable";
import type { validTypes } from "../../../../../lib/io-ts/valid-types";
import type { ColumnForData } from "../table-helper";
import { LinkCell } from "../cells/LinkCell";
import { linkPropsFromCompany } from "../../../../../lib/api/utils/link-from";

const baseUser = {
  unitId: 1,
  companyId: 1,
  email: "email@email.com",
  name: "John doe",
  id: 1,
};
const getUser = (
  overrides: Partial<typeof baseUser> = {}
): typeof baseUser => ({
  ...baseUser,
  ...overrides,
});

const dataSource = [
  getUser(),
  getUser(),
  getUser(),
  getUser({ name: "Mary Jane" }),
  getUser({ name: "Mary Jane" }),
  getUser({ name: "Mary Jane" }),
] satisfies validTypes["User"][];

const columns = [
  { title: "Name", key: "name", dataIndex: "name" },
  { title: "Email", key: "email", dataIndex: "email" },
  {
    title: "Company",
    key: "companyId",
    dataIndex: "companyId",
    render: (value) => {
      const { label, href } = linkPropsFromCompany({
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
const meta = {
  title: "Components/Table",
  component: BaseTable,
  args: {
    dataSource,
    columns: columns,
    pagination: { pageSize: 3 },
  },
} satisfies Meta<typeof BaseTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => <BaseTable {...props} />,
};
