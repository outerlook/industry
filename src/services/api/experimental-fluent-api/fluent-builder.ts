//EXPERIMENTAL - NOT WORKING YET
// objective to use like this:
// const fluent = buildFluentAcess(exampleSchema)
// fluent('asset', getAsset).workorders().get() // returns Workorder[]
// fluent('workorder', getWorkorder).asset(id).get() // returns Asset

export const buildFluentAccess =
    <Schema extends FluentSchema>(schema: Schema) =>
        <K extends keyof Schema>(key: K) =>
            (getFn: GetFnForFluentAccessor<Schema, K>): FluentAccess<Schema, K> => {
                const relations = schema[key]!;
                const relationKeys = Object.keys(relations) as (keyof Schema[K])[];

                return relationKeys.reduce((acc, relationKey) => {
                    const getRelation = relations[relationKey]!;
                    const newGetFn = () => getRelation(getFn());
                    return {
                        ...acc,
                        [relationKey]: () => buildFluentAccess(schema)(relationKey)(newGetFn),
                    };
                }, {get: getFn} as FluentAccess<Schema, K>);
            };

export const buildFluentSchema = <Schema extends FluentSchema>(
    schema: Schema
): Schema => schema;

// TYPES
type Accessor<Obj, ReturnType> = (obj: Obj) => ReturnType;

type FluentAccessor<Schema> = {
    [key in keyof Schema]?: Accessor<any, any>;
};

export type FluentSchema<T extends FluentSchema<any> = FluentSchema<any>> = {
    [key in keyof T]: FluentAccessor<T>;
};

type RelationAccess<Schema extends FluentSchema, K extends keyof Schema> = {
    [key in keyof Schema[K] & keyof Schema]: () => FluentAccess<Schema, key>;
};

type GetFn<U> = () => U;
export type GetFnForFluentAccessor<
    Schema extends FluentSchema,
    K extends keyof Schema
> = Schema[K][keyof Schema[K]] extends Accessor<infer U, any>
    ? GetFn<U>
    : never;

type FluentAccess<
    Schema extends FluentSchema,
    K extends keyof Schema
> = RelationAccess<Schema, K> & {
    get: GetFnForFluentAccessor<Schema, K>;
};
