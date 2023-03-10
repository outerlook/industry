import type {Meta, StoryObj} from "@storybook/react";
import {TablePanel} from "../table/TablePanel";
import {testTableData} from "@/ui/components/common/Table/stories/test-table";


const meta = {
    title: "Panels/TablePanel",
    component: TablePanel,
    args: {
        tableProps: {
            dataSource: testTableData.dataSource,
            columns: testTableData.columns,
            // pagination: {pageSize: 4  } // FIXME: this is not working
        }
    }
} satisfies Meta<typeof TablePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => (
        <div className={"w-full"}>
            <TablePanel {...props}/>
        </div>
    ),
}