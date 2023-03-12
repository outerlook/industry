import {expect, test} from "vitest";

import {pickAssetColumns} from "@/lib/api/table/assetColumns";

test("types are working", () => {
  const column = pickAssetColumns("name", "status");
  const column2 = pickAssetColumns("name");
  const column3 = pickAssetColumns();
  expect(column).toMatchInlineSnapshot(`
    [
      {
        "dataIndex": "name",
        "key": "name",
        "title": "Name",
      },
      {
        "dataIndex": "status",
        "key": "status",
        "title": "Status",
      },
    ]
  `);
  expect(column2).toMatchInlineSnapshot(`
    [
      {
        "dataIndex": "name",
        "key": "name",
        "title": "Name",
      },
    ]
  `);
  expect(column3).toMatchInlineSnapshot(`
    [
      {
        "dataIndex": "name",
        "key": "name",
        "title": "Name",
      },
    ]
  `);
});
