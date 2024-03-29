import type {RawAPI, Status, WorkOrderStatus} from "../raw-api-types";
import * as t from "io-ts";
import * as ts from "io-ts-types";

// CUSTOM SCALARS
const ID = t.brand(
    t.number,
    (n: number): n is t.Branded<number, { readonly ID: unique symbol }> => n >= 0,
    "ID"
);
const CelciusTemperature = t.brand(
    t.number,
    (
        n: number
    ): n is t.Branded<number, { readonly CelciusTemperature: unique symbol }> =>
        n >= -273.15,
    "CelciusTemperature"
);
const Power = t.brand(
    t.number,
    (n: number): n is t.Branded<number, { readonly Power: unique symbol }> =>
        n >= 0,
    "Power"
);

const RPM = t.brand(
    t.number,
    (n: number): n is t.Branded<number, { readonly RPM: unique symbol }> =>
        n >= 0,
    "RPM"
);

const Percentile = t.brand(
    t.number,
    (n: number): n is t.Branded<number, { readonly Percentile: unique symbol }> =>
        n >= 0 && n <= 100,
    "Percentile"
);

type Weak<T> = { [key in keyof T]: unknown };

// ENUMS
const StatusT = t.keyof({
    inAlert: "inAlert",
    inDowntime: "inDowntime",
    inOperation: "inOperation",
    plannedStop: "plannedStop",
    unplannedStop: "unplannedStop",
} satisfies Record<Status, unknown>);

const WorkOrderStatusT = t.keyof({
    completed: "completed",
    "in progress": "in progress",
} satisfies Record<WorkOrderStatus, unknown>);

const HealthHistoryT = t.type({
    status: StatusT,
    timestamp: ts.DateFromISOString,
} satisfies Weak<RawAPI["HealthHistory"]>);

const MetricsT = t.type({
    lastUptimeAt: ts.DateFromISOString,
    totalCollectsUptime: t.number,
    totalUptime: t.number,
} satisfies Weak<RawAPI["Metrics"]>);

const SpecificationsT = t.type({
    maxTemp: CelciusTemperature,
    power: t.union([Power, t.undefined]),
    rpm: t.union([RPM, t.null, t.undefined]),
});

const AssetT = t.type({
    assignedUserIds: t.array(ID),
    companyId: ID,
    healthHistory: t.array(HealthHistoryT),
    healthscore: Percentile,
    id: ID,
    image: t.string,
    metrics: MetricsT,
    model: t.string,
    name: t.string,
    sensors: t.array(t.string),
    specifications: SpecificationsT,
    status: StatusT,
    unitId: ID,
} satisfies Weak<RawAPI["Asset"]>);

const CompanyT = t.type({
    id: ID,
    name: t.string,
} satisfies Weak<RawAPI["Company"]>);

const ChecklistT = t.type({
    completed: t.boolean,
    task: t.string,
} satisfies Weak<RawAPI["Checklist"]>);

const UnitT = t.type({
    companyId: ID,
    id: ID,
    name: t.string,
} satisfies Weak<RawAPI["Unit"]>);

const UserT = t.type({
    companyId: ID,
    email: t.string,
    id: ID,
    name: t.string,
    unitId: ID,
} satisfies Weak<RawAPI["User"]>);

const WorkorderT = t.type({
    assetId: ID,
    assignedUserIds: t.array(ID),
    checklist: t.array(ChecklistT),
    description: t.string,
    id: ID,
    priority: t.string,
    status: WorkOrderStatusT,
    title: t.string,
} satisfies Weak<RawAPI["Workorder"]>);

export const enumTypes = {
    Status: StatusT,
    WorkOrderStatus: WorkOrderStatusT,
};

/**
 * Objects that contains ID
 */
export const entityTypes = {
    Asset: AssetT,
    Company: CompanyT,
    Unit: UnitT,
    User: UserT,
    Workorder: WorkorderT,
};
export const embededTypes = {
    Checklist: ChecklistT,
    Metrics: MetricsT,
    HealthHistory: HealthHistoryT,
    Specifications: SpecificationsT,
};

export const customScalars = {
    ID,
    CelciusTemperature,
    Power,
    RPM,
    Percentile,
};

// only the used ones
export const builtInScalars = {
    Date: ts.DateFromISOString,
    String: t.string,
    Number: t.number,
    Boolean: t.boolean,
}
export const allUsedScalars = {
    ...customScalars,
    ...builtInScalars
}

export const apiTypes = {
    ...enumTypes,
    ...entityTypes,
    ...embededTypes,
    ...customScalars,
};
