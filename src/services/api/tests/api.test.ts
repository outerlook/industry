import {describe, expect, test} from 'vitest';
import {$api} from '../fetch/rxjs-api';
import * as E from 'fp-ts/Either';
import {firstValueFrom, map} from 'rxjs';
import {flow, pipe} from 'effect';
import {formatValidationErrors} from 'io-ts-reporters';
import {relations} from '../relations';

describe('api', () => {
    test('one asset', async () => {
        const assetEither = await firstValueFrom($api.Asset.byId({id: '1'}));
        const asset = pipe(
            assetEither,
            E.mapLeft(
                flow(
                    E.fromPredicate(Array.isArray, e => e),
                    E.fold(v => v, formatValidationErrors)
                )
            ),
            E.getOrElseW(e => {
                throw e;
            })
        );

        expect(asset).toMatchInlineSnapshot(`
          {
            "assignedUserIds": [
              1,
              2,
              3,
            ],
            "companyId": 1,
            "healthHistory": [
              {
                "status": "inOperation",
                "timestamp": 2022-12-01T00:00:00.000Z,
              },
              {
                "status": "inDowntime",
                "timestamp": 2022-12-08T00:00:00.000Z,
              },
              {
                "status": "inOperation",
                "timestamp": 2022-12-15T00:00:00.000Z,
              },
              {
                "status": "inAlert",
                "timestamp": 2022-12-22T00:00:00.000Z,
              },
              {
                "status": "unplannedStop",
                "timestamp": 2022-12-29T00:00:00.000Z,
              },
            ],
            "healthscore": 70,
            "id": 1,
            "image": "https://tractian-img.s3.amazonaws.com/6d5028682016cb43d02b857d4f1384ae.jpeg",
            "metrics": {
              "lastUptimeAt": 2023-01-01T16:17:50.180Z,
              "totalCollectsUptime": 7516,
              "totalUptime": 1419.620084999977,
            },
            "model": "motor",
            "name": "Motor H13D-1",
            "sensors": [
              "GSJ1535",
            ],
            "specifications": {
              "maxTemp": 80,
              "power": undefined,
              "rpm": undefined,
            },
            "status": "inAlert",
            "unitId": 1,
          }
        `);
    });

    test('all units', async () => {
        const eitherUnits = await firstValueFrom($api.Unit.all());
        const units = pipe(
            eitherUnits,
            E.getOrElseW(e => {
                throw e;
            })
        );

        expect(units).toMatchInlineSnapshot(`
      [
        {
          "companyId": 1,
          "id": 1,
          "name": "Jaguar Unit",
        },
        {
          "companyId": 1,
          "id": 2,
          "name": "Tobias Unit",
        },
      ]
    `);
    });

    test('asset relations', async () => {
        const asset$ = $api.Asset.byId({id: '1'});
        const relations$ = asset$.pipe(
            map(asset =>
                pipe(
                    asset,
                    E.map(relations.asset),
                    E.getOrElseW(e => {
                        throw e;
                    })
                )
            )
        );

        const {company$, unit$, assignedUsers$} = await firstValueFrom(
            relations$
        );

        const [eitherCompany, eitherUnit, eitherAssignedUsers] = await Promise.all([
            firstValueFrom(company$),
            firstValueFrom(unit$),
            firstValueFrom(assignedUsers$),
        ] as const);

        expect(eitherCompany).toMatchInlineSnapshot(`
          {
            "_tag": "Right",
            "right": {
              "id": 1,
              "name": "The Test Company",
            },
          }
        `);
        expect(eitherUnit).toMatchInlineSnapshot(`
          {
            "_tag": "Right",
            "right": {
              "companyId": 1,
              "id": 1,
              "name": "Jaguar Unit",
            },
          }
        `);
        expect(eitherAssignedUsers).toMatchInlineSnapshot(`
          [
            {
              "_tag": "Right",
              "right": {
                "companyId": 1,
                "email": "testerOne@tractian.com",
                "id": 1,
                "name": "John Doe",
                "unitId": 1,
              },
            },
            {
              "_tag": "Right",
              "right": {
                "companyId": 1,
                "email": "testerTwo@tractian.com",
                "id": 2,
                "name": "Jane Doe",
                "unitId": 1,
              },
            },
            {
              "_tag": "Right",
              "right": {
                "companyId": 1,
                "email": "testerThree@tractian.com",
                "id": 3,
                "name": "Bob Smith",
                "unitId": 1,
              },
            },
          ]
        `);
    });
});
