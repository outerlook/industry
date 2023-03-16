interface Asset {
    assignedUserIds: number[];
    companyId: number;
    healthHistory: HealthHistory[];
    healthscore: number;
    id: number;
    image: string;
    metrics: Metrics;
    model: string;
    name: string;
    sensors: string[];
    specifications: Specifications;
    status: Status;
    unitId: number;
}

interface HealthHistory {
    status: Status;
    timestamp: Date;
}

enum Status {
    InAlert = "inAlert",
    InDowntime = "inDowntime",
    InOperation = "inOperation",
    PlannedStop = "plannedStop",
    UnplannedStop = "unplannedStop",
}

interface Metrics {
    lastUptimeAt: Date;
    totalCollectsUptime: number;
    totalUptime: number;
}

interface Specifications {
    maxTemp: number;
    power?: number;
    rpm?: number | null;
}

interface Company {
    id: number;
    name: string;
}

interface Unit {
    companyId: number;
    id: number;
    name: string;
}

interface User {
    companyId: number;
    email: string;
    id: number;
    name: string;
    unitId: number;
}

interface Workorder {
    assetId: number;
    assignedUserIds: number[];
    checklist: Checklist[];
    description: string;
    id: number;
    priority: string;
    status: WorkOrderStatus;
    title: string;
}

type WorkOrderStatus = "completed" | "in progress";

interface Checklist {
    completed: boolean;
    task: string;
}

export type RawAPI = {
    Asset: Asset;
    Company: Company;
    Unit: Unit;
    User: User;
    Workorder: Workorder;
    WorkOrderStatus: WorkOrderStatus;
    Status: Status;
    HealthHistory: HealthHistory;
    Metrics: Metrics;
    Specifications: Specifications;
    Checklist: Checklist;
};
