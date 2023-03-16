import * as A from "fp-ts/Array";
import type * as t from "io-ts";
import type {apiTypes} from "./validation/api-types";
import {$api} from "src/services/api/fetch/rxjs-api";
import type {Observable} from "rxjs";
import {forkJoin, pluck, share} from "rxjs";
import * as OE from "fp-ts-rxjs/ObservableEither";
import {pipe} from "effect";
import {fromEitherObservable} from "@lib/rxjs/fp-ts/from-either-observable";

/*
 * Advantage of using observables:
 * it only fetches the data when it's needed
 */
const assetRelations = (asset: t.TypeOf<typeof apiTypes.Asset>) => {
    const {companyId, unitId, assignedUserIds} = asset;

    const company$ = $api.Company.byId({id: companyId.toString()});
    const unit$ = $api.Unit.byId({id: unitId.toString()});
    const assignedUsers$ = forkJoin(
        assignedUserIds.map((id) => $api.User.byId({id: id.toString()}))
    );

    const workorders$ = pipe(
        fromEitherObservable($api.WorkOrder.all()),
        OE.map(A.filter((e) => e.assetId === asset.id))
    );
    return {
        company$,
        unit$,
        assignedUsers$,
        workorders$,
    };
};

const usersRelations = (user: t.TypeOf<typeof apiTypes.User>) => {
    const {companyId, unitId} = user;

    const company$ = $api.Company.byId({id: companyId.toString()});
    const unit$ = $api.Unit.byId({id: unitId.toString()});

    return {
        company$,
        unit$,
    };
};

const workOrderRelations = (workOrder: t.TypeOf<typeof apiTypes.Workorder>) => {
    const {assetId, assignedUserIds} = workOrder;

    const asset$ = $api.Asset.byId({id: assetId.toString()});
    const assignedUsers$ = forkJoin(
        assignedUserIds.map((id) => $api.User.byId({id: id.toString()}))
    );

    const subRelations$ = pipe(
        fromEitherObservable(asset$),
        OE.map((e) => assetRelations(e)),
        OE.chainW((e) => pipe(forkJoin(e), OE.fromObservable)),
        OE.getOrElse((e) => {
            throw e;
        })
    ).pipe(share());

    const company$ = subRelations$.pipe(pluck("company$"));
    const unit$ = subRelations$.pipe(pluck("unit$"));

    return {
        asset$,
        assignedUsers$,
        company$,
        unit$,
    };
};

const unitRelations = (unit: t.TypeOf<typeof apiTypes.Unit>) => {
    const {companyId} = unit;

    const company$ = $api.Company.byId({id: companyId.toString()});

    return {
        company$,
    };
};

const companyRelations = (company: t.TypeOf<typeof apiTypes.Company>) => {
    const {id} = company;

    const units$ = pipe(
        fromEitherObservable($api.Unit.all()),
        OE.map((e) => e.filter((e) => e.companyId === id))
    );

    const assets$ = pipe(
        fromEitherObservable($api.Asset.all()),
        OE.map((e) => e.filter((e) => e.companyId === id))
    );

    const workOrders$ = pipe(
        fromEitherObservable($api.WorkOrder.all()),
        OE.bindTo("allWorkOrders"),
        OE.bind("companyAssets", () => assets$),
        OE.map(({allWorkOrders, companyAssets}) =>
            allWorkOrders.filter((e) => companyAssets.some((a) => a.id === e.assetId))
        )
    );

    return {
        units$,
        assets$,
        workOrders$,
    };
};

export type GetRelationsFor<T extends keyof typeof relations> = ReturnType<
    (typeof relations)[T]
>;
type UnwrapObservableRecords<T> = {
    [K in keyof T as K extends `${infer U}$`
        ? U
        : never]: T[K] extends Observable<infer U> ? U : never;
};

export type UnwrapRelations<T extends keyof typeof relations> =
    UnwrapObservableRecords<GetRelationsFor<T>>;

export type RelationKeysOf<T extends keyof typeof relations> =
    T extends keyof typeof relations
        ? keyof GetRelationsFor<T> extends `${infer U}$`
            ? U
            : never
        : never;

export const relations = {
    asset: assetRelations,
    users: usersRelations,
    workOrder: workOrderRelations,
    unit: unitRelations,
    company: companyRelations,
};
