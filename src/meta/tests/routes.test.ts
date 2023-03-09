import {describe, expect, test} from "vitest";
import {readRoutes} from "../get-routes";
import {getLinkToFn, getLinkToFnForRoutesStatement} from "../get-link-helper";

describe("routes", () => {
  test("should be able to read routes", () => {
    // reads, checks inline snapshot
    const routes = readRoutes();
    expect(routes).toMatchInlineSnapshot(`
          [
            "/assets",
            "/companies/:id",
            "/companies",
            "/",
            "/users",
          ]
        `);
  });
});

test("should be able to generate linkTo functions", () => {
  const linkTo = getLinkToFn("/companies/:id");
  expect(linkTo).toMatchInlineSnapshot(`
    {
      "fn": "({id}: {id: string}) => \`/companies/\${id}\`",
      "params": [
        "id",
      ],
      "route": "/companies/:id",
    }
  `);
});

test("should be able to generate linkTo functions", () => {
  const routes = readRoutes();
  const linkToFn = getLinkToFnForRoutesStatement(routes);
  expect(linkToFn).toMatchInlineSnapshot('"export const linkTo = ({\\"/assets\\": ({}: {}) => `/assets`, \\"/companies/:id\\": ({id}: {id: string}) => `/companies/${id}`, \\"/companies\\": ({}: {}) => `/companies`, \\"/\\": ({}: {}) => `/`, \\"/users\\": ({}: {}) => `/users`})"');
});
