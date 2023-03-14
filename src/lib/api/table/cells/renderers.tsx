import type {validTypes} from "@/lib/io-ts/valid-types";
import {Tag} from "antd";
import {customScalars, enumTypes} from "@/lib/io-ts/api-types";
import {scalarFormatters} from "@/lib/api/renders/text";

const colorByStatus = {
    'inAlert': 'red',
    inDowntime: 'orange',
    inOperation: 'green',
    plannedStop: 'blue',
    unplannedStop: 'purple',
} satisfies    Record<validTypes['Status'], string>

const labelByStatus = {
    'inAlert': 'IN ALERT',
    inDowntime: 'IN DOWNTIME',
    inOperation: 'IN OPERATION',
    plannedStop: 'PLANNED STOP',
    unplannedStop: 'UNPLANNED STOP',
} satisfies    Record<validTypes['Status'], string>

export const renderStatus = (status: validTypes['Status']) => {

    return (
        <Tag color={colorByStatus[status]} >
            {labelByStatus[status]}
        </Tag>
    );
};

export const renderLink = <T extends any>(fn: (a: T)=> ({label: string, href: string})) => (_: any, a: T) => {
    const {href, label} = fn(a)
    return <a href={href}>{label}</a>;
}
export const toReactLink = ({href, label}: {href: string, label: string}) => <a href={href}>{label}</a>
export const renderPercentile = scalarFormatters.Percentile // todo could render percentile cell bar