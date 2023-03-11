import type { RawAPI, Status, WorkOrderStatus } from "@/lib/api/raw-api-types";
import * as t from "io-ts";
import * as ts from "io-ts-types";

// CUSTOM SCALARS
const ID = t.refinement(t.number, (n: number) => n >= 0, "ID");
const CelciusTemperature = t.refinement(
  t.number,
  (n: number) => n >= -273.15,
  "CelciusTemperature"
);
const Power = t.refinement(t.number, (n: number) => n >= 0, "Power");
const RPM = t.refinement(t.number, (n: number) => n >= 0, "RPM");

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
  healthscore: t.number,
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
  assignedUserIds: t.array(t.number),
  checklist: t.array(ChecklistT),
  description: t.string,
  id: ID,
  priority: t.string,
  status: WorkOrderStatusT,
  title: t.string,
} satisfies Weak<RawAPI["Workorder"]>);

export const apiTypes = {
  Status: StatusT,
  Asset: AssetT,
  WorkOrderStatus: WorkOrderStatusT,
  Company: CompanyT,
  Checklist: ChecklistT,
  Metrics: MetricsT,
  Unit: UnitT,
  User: UserT,
  HealthHistory: HealthHistoryT,
  Specifications: SpecificationsT,
  Workorder: WorkorderT,
};

export const customScalars = {
  ID,
  CelciusTemperature,
  Power,
  RPM,
};
