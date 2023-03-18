import * as E from 'fp-ts/Either';
import type {validTypes} from '@services/api/validation/valid-types';
import type {Axis, ColorAxisOptions, Series} from 'highcharts';
import {pipe} from 'effect';
import * as A from 'fp-ts/Array';
import {deepMergeMonoid} from '@lib/fp-ts/deep-merge-monoid';
import type {Object} from 'ts-toolbelt';
import {Lens} from 'monocle-ts';
import * as O from 'fp-ts/Option';
import * as I from 'fp-ts/Identity';
import type {TreeMapProps} from './CompanyTreeMap';
import {prepend} from 'fp-ts-std/String'; // TODO Ugly file

// TODO Ugly file
// - but ugly logics too
// - add tests or refactor

// Types
type IdentifiableObject = {
  originalId: string;
  id: string;
  name: string;
  type: string;
};

type Element = {
  parent?: string | undefined;
  value?: number | undefined;
  colorValue?: number | undefined;
} & IdentifiableObject;

export type TreeElement = Element & { children?: TreeElement[] | undefined };

type ColorRange = [minColor: string, maxColor: string];

// Helpers

const toElement =
  // type is important because id is not globally unique, and it needs to be
  // TODO:
  // but it is a hack to get quick for demonstration purposes
  // not ergonomics


    (type: string, parentType?: string) =>
    <T extends object>(props: {
      idProp: Object.SelectKeys<T, string | number>;
      nameProp: Object.SelectKeys<T, string>;
      parentIdProp?: Object.SelectKeys<T, string | number>;
      valueProp?: Object.SelectKeys<T, number>;
    }) =>
    (t: T): Element => {
      // FIXME UGLY
      // but important to be ugly and typesafe and not to use any at the end
      const idLens = Lens.fromProp<T>()(props.idProp) as unknown as Lens<
        T,
        string | number
      >;
      const nameLens = Lens.fromProp<T>()(props.nameProp) as unknown as Lens<
        T,
        string
      >;
      const parentIdLens =
        props.parentIdProp &&
        (Lens.fromProp<T>()(props.parentIdProp) as unknown as Lens<
          T,
          string | number
        >);
      const valueLens =
        props.valueProp &&
        (Lens.fromProp<T>()(props.valueProp) as unknown as Lens<T, number>);

      /**
       * @example
       * {} -> {[prop]: right}
       * bindOptionIfExists(prop, option)
       * @param o
       * @param f
       */
      const bindOptionIfExists =
        <K extends string, V, A>(prop: K, option: O.Option<A>) =>
        (v: V): V | (V & { [key in K]?: A }) =>
          pipe(
            option,
            O.fold(
              () => v,
              a => ({ ...v, [prop]: a })
            )
          );

      const optionParentType = pipe(E.fromNullable(undefined)(parentType));

      const parentIdOption = pipe(
        O.fromNullable(parentIdLens),
        O.map(lens => lens.get(t)),
        O.map(String), // why is this better? becuase mapping won't result on string "undefined"
        O.map(
          pipe(
            optionParentType,
            E.fold(
              () => () => '', // noop
              parentType => prepend(parentType)
            )
          )
        )
      );
      const valueOption = pipe(
        O.fromNullable(valueLens),
        O.map(lens => lens.get(t))
      );

      const id = pipe(idLens.get(t), String);
      const globalUniqueId = pipe(id, prepend(type));

      return pipe(
        I.Do,
        I.bind('id', () => globalUniqueId),
        I.bind('originalId', () => id),
        I.bind('type', () => type),
        I.bind('name', () => nameLens.get(t)),
        bindOptionIfExists('parent', parentIdOption),
        bindOptionIfExists('value', valueOption)
      );
    };

const flattenTree = (tree: TreeElement): TreeElement[] => {
  const children = tree.children;
  return children?.length
    ? pipe(
        children,
        A.map(flattenTree),
        A.reduce([tree], (prev, curr) => [...prev, ...curr])
      )
    : [tree];
};

// enity helpers
const assetToElement = toElement(
  'asset',
  'unit'
)<validTypes['Asset']>({
  idProp: 'id',
  nameProp: 'name',
  parentIdProp: 'unitId',
  valueProp: 'healthscore',
});
const unitToElement = toElement(
  'unit',
  'company'
)<validTypes['Unit']>({
  idProp: 'id',
  nameProp: 'name',
  parentIdProp: 'companyId',
});
const companyToElement = toElement('company')<validTypes['Company']>({
  idProp: 'id',
  nameProp: 'name',
});

const groupByParent = <Child extends { parent: string }>(
  cs: Child[]
): Record<string, Child[]> =>
  pipe(
    cs,
    A.foldMap(deepMergeMonoid<Record<string, Child[]>>(true))(c => ({
      [c.parent]: [c],
    }))
  );

// Tree to config helpers
const treeElementToSeries = (
  treeElement: TreeElement,
  axisNumber: number
): Series => ({
  type: 'treemap',
  xAxis: axisNumber,
  colorAxis: axisNumber,
  data: flattenTree(treeElement),
});

const treeElementToXAxis = (totalAxis: number, axisNumber: number): Axis => {
  const xAxisPercentage = 100 / totalAxis;
  const xAxisWidth = `${xAxisPercentage}%`;
  const xAxisLeft = `${xAxisPercentage * axisNumber}%`;

  return {
    width: xAxisWidth,
    left: xAxisLeft,
  };
};

const treeElementToColorAxis = ([
  minColor,
  maxColor,
]: ColorRange): ColorAxisOptions => ({
  minColor,
  maxColor,
  min: 0,
  max: 100,
});

const treeElementToHighchartsOptions =
  (baseColors: ColorRange[]) =>
  (
    axisNumber: number,
    treeElement: TreeElement,
    allTreeElements: TreeElement[]
  ) => {
    const series = treeElementToSeries(treeElement, axisNumber);
    const xAxis = treeElementToXAxis(allTreeElements.length, axisNumber);
    const colorAxis = treeElementToColorAxis(
      baseColors[axisNumber] ?? ['#fff', '#000']
    );

    return {
      series: [series],
      xAxis: [xAxis],
      colorAxis: [colorAxis],
    };
  };

const buildTreeFromChildOrElement =
  (elementGroups: Record<string, Element[]>) =>
  (parentOrChild: Element): TreeElement => {
    const children = elementGroups[parentOrChild.id];
    return {
      id: parentOrChild.id,
      name: parentOrChild.name,
      originalId: parentOrChild.originalId,
      parent: parentOrChild.parent,
      value: parentOrChild.value,
      type: parentOrChild.type,
      colorValue: parentOrChild.value, // Here we add color value to the element
      children: children?.length
        ? children.map(buildTreeFromChildOrElement(elementGroups))
        : undefined,
    };
  };
export const propsToCompanyTree = (props: TreeMapProps) =>
  pipe(
    props.companies,
    A.map(companyToElement),
    A.map(
      buildTreeFromChildOrElement(
        groupByParent(
          pipe(
            [] as Element[],
            A.concat(props.units.map(unitToElement)),
            A.concat(props.assets.map(assetToElement))
          )
        ) as Record<string, Element[]>
      )
    )
  );
export const toTreemapData =
  (baseColors: ColorRange[]) =>
  <
    Result extends {
      colorAxis: Array<ColorAxisOptions>;
      series: Series;
      xAxis: Array<Axis>;
    }
  >(
    parents: TreeElement[]
  ): Result =>
    pipe(
      parents,
      A.mapWithIndex((i, v) =>
        treeElementToHighchartsOptions(baseColors)(i, v, parents)
      ),
      A.foldMap(deepMergeMonoid<Result>(true))(a => a)
    );
