import {EntityLayout} from "@/ui/components/layouts/EntityListLayout";
import {TablePanel} from "@/ui/components/panels/table/TablePanel";
import type {validTypes} from "@/lib/io-ts/valid-types";
import {pickUserColumns} from "@/lib/api/table/usersColumns";

export const UsersContent = ({users}: { users: validTypes["User"][] }) => {
    const dataSource = users;
    const columns = pickUserColumns();

    return (
        <EntityLayout title={"Users"}>
            <TablePanel
                tableProps={{
                    dataSource,
                    columns,
                }}
            />
        </EntityLayout>
    );
};
