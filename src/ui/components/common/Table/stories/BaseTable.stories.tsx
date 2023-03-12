import type {Meta, StoryObj} from "@storybook/react";
import {BaseTable} from "../BaseTable";
import {testTableData} from "@/ui/components/common/Table/stories/test-table";

const meta = {
  title: "Components/Table",
  component: BaseTable,
  args: {
    dataSource: testTableData.dataSource,
    columns: testTableData.columns,
    pagination: { pageSize: 3 },
  },
} satisfies Meta<typeof BaseTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => <BaseTable {...props} />,
};
