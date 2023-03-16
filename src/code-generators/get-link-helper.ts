/***
 * it aims to produce the following output:
 * export const linkTo = {
 *  "/companies/:id": ({id}: {id: string}) => `/companies/${:id}`,
 *  "/companies": ({}: {}) => `/companies`,
 *  ...
 *  }
 */

/**
 * Given a route, returns an object helping to generate a linkTo function
 */
export const getLinkToFn = (route: string) => {
  // input: '/companies/:id'
  // output: "(id: string) => `/companies/${id}`"
  const params = route.match(/:[a-z]+/g)?.map((p) => p.slice(1)) ?? [];
  // [id, name] => "({id, name}: {id: string, nameString}) => "
  const paramsString = params.join(", ");
  const paramTypes = params.map((p) => `${p}: string`).join(", ");
  const fn = `({${paramsString}}: {${paramTypes}}) => \`${route.replace(
    /:([a-z]+)/g,
    "${$1}"
  )}\``;
  return { params, fn, route };
};

/**
 * Given an object, returns a string representing the object
 * @param rec
 */
const generateObjectFromRecord = (rec: Record<string, string>): string => {
  const insideVal = Object.entries(rec)
    .map(([key, value]) => `"${key}": ${value}`)
    .join(", ");
  return `{${insideVal}}`;
};

export const getLinkToFnForRoutesStatement = (routes: string[]): string => {
  const linkToFn = routes.reduce((acc, cur) => {
    const { fn, route } = getLinkToFn(cur);
    return { ...acc, [route]: fn };
  }, {});
  const obj = generateObjectFromRecord(linkToFn);

  return `export const linkTo = (${obj})`;
};
