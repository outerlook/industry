import {describe, expect, test} from "vitest";
import {groupWorkordersByUserId} from "../entity-adapters";

describe("entity adapters", () => {
    test("groupWorkordersByUserId", () => {
        const workorders = [
        {
            id: 1,
            assignedUserIds: [1, 2],
        },
        {
            id: 2,
            assignedUserIds: [1, 3],
        },
        ];

        const result = groupWorkordersByUserId(workorders as any);

        expect(result).toMatchInlineSnapshot(`
          {
            "1": [
              {
                "assignedUserIds": [
                  1,
                  2,
                ],
                "id": 1,
              },
              {
                "assignedUserIds": [
                  1,
                  3,
                ],
                "id": 2,
              },
            ],
            "2": [
              {
                "assignedUserIds": [
                  1,
                  2,
                ],
                "id": 1,
              },
            ],
            "3": [
              {
                "assignedUserIds": [
                  1,
                  3,
                ],
                "id": 2,
              },
            ],
          }
        `);
    });
})