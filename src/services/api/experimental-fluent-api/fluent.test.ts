import {expect, test} from "vitest";
import {buildFluentAccess, buildFluentSchema} from "@services/api/experimental-fluent-api/fluent-builder";

type ASSET = 'ASSET';
type WORKORDER = "WORKORDER";
test('basic one first', async () => {
    const testSchema = buildFluentSchema({
        asset: {
            workorders: (asset: ASSET) => ['WORKORDER1', "WORKORDER2"] as const
        },
        workorders: {
            asset: (workorders: WORKORDER[]) => ['ASSET1', 'ASSET2'] as const
        },
        workorder: {
            asset: (workorder: WORKORDER) => 'WORKORDER2'
        }
    })


    const fluent = buildFluentAccess(testSchema)
    const getWorkorders = fluent('asset')(() => 'ASSET').workorders().asset().workorders()

    expect(getWorkorders.get()).toMatchInlineSnapshot(`
      [
        "WORKORDER1",
        "WORKORDER2",
      ]
    `)
})