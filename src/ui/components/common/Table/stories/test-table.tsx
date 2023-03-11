import {linkForCompany} from "@/lib/api/utils/link-from";
import {LinkCell} from "@/ui/components/common/Table/cells/LinkCell";
import type {ColumnForData} from "@/ui/components/common/Table/table-helper";
import {getUser} from "@/lib/api/tests/utils";
import type {validTypes} from "@/lib/io-ts/valid-types";

const dataSource = [
    getUser(),
    getUser(),
    getUser(),
    getUser({name: "Mary Jane"}),
    getUser({name: "Mary Jane"}),
    getUser({name: "Mary Jane"}),
] satisfies validTypes["User"][];
const columns = [
    {title: "Name", key: "name", dataIndex: "name"},
    {title: "Email", key: "email", dataIndex: "email"},
    {
        title: "Company",
        key: "companyId",
        dataIndex: "companyId",
        render: (value) => {
            const {label, href} = linkForCompany({
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
}