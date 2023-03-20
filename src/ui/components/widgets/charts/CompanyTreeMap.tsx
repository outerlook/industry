import * as E from 'fp-ts/Either';
import Highcharts from 'highcharts';
import * as O from 'fp-ts/Option';
import * as I from 'fp-ts/Identity';
import {flow, pipe} from 'effect';
import type {validTypes} from '@services/api/validation/valid-types';
import {TreeMapChart} from './TreemapChart';
import {propsToCompanyTree, toTreemapData, TreeElement,} from './company-tree-builder';
import {Optional} from 'monocle-ts';
import {deepMergeMonoid} from '@lib/fp-ts/deep-merge-monoid';
import * as A from 'fp-ts/Array';
import type {Endomorphism} from 'fp-ts/Endomorphism';
import {deepmergeC} from '@lib/utils/deepmergeC';
import type {Object} from 'ts-toolbelt';
import {getOrThrow} from '@lib/fp-ts/get-or-throw';

const baseOptions = {
  title: {
    text: null as any, // bad typings. Null means no title
  },
  plotOptions: {
    treemap: {
      layoutAlgorithm: 'squarified',
      tooltip: {
        valueSuffix: '%',
      },
      alternateStartingDirection: true,
      /* TODO
       * when we aggregate, we should take mean of all values, not the sum
       * but this is not possible yet, I didn't find how to
       */
      // TODO - LEVELS MAYBE SHOULDN'T BE HARDCODED
      levels: [
        {
          level: 1, // company level
          borderWidth: 4,
          borderColor: 'black',
          dataLabels: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top',
            style: {
              fontSize: '15px',
              fontWeight: 'bold',
            },
          },
        },
        {
          level: 2, // Units level
          borderColor: 'purple',
          borderWidth: 1,
          dataLabels: {
            enabled: true,
            align: 'right',
            verticalAlign: 'bottom',
            style: {
              fontSize: '10px',
            },
          },
          layoutAlgorithm: 'squarified',
        },
      ],
    },
  },

  chart: {
    type: 'treemap',
  },
} satisfies Highcharts.Options;

type ClickHandler = (
  evt: Object.Merge<
    Highcharts.PointClickEventObject,
    {
      point: { options: TreeElement };
    },
    'deep'
  >
) => void;
export type TreeMapProps = {
  companies: validTypes['Company'][];
  units: validTypes['Unit'][];
  assets: validTypes['Asset'][];
  onClick?: ClickHandler;
};

const treeMapOptionsLens = Optional.fromPath<Highcharts.Options>()([
  'plotOptions',
  'treemap',
]);

const setClickEvent = (handler: ClickHandler) =>
  treeMapOptionsLens.modify(
    deepmergeC({
      className: 'cursor-pointer',
      events: {
        click: handler,
      },
    })
  );

const optionalClickEventFromProps = Optional.fromPath<TreeMapProps>()([
  'onClick',
]);

/**
 * Gets the click handler from props, and works with it if present
 * returns an Endomorphism (CFG => CFG)
 */
const configureClickEventIfPresent: (
  props: TreeMapProps
) => Endomorphism<Highcharts.Options> = flow(
  optionalClickEventFromProps.getOption,
  O.map(flow(setClickEvent)),
  O.getOrElse(() => I.of)
);

export const CompanyTreeMap = (props: TreeMapProps) => {
  const axisOptions = pipe(
    propsToCompanyTree(props),
    E.map(
      toTreemapData([
        // red to green in all, hardcoded but could have
        // different colors for different companies
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
      ])
    ),
    getOrThrow,
  );

  const options = pipe(
    [baseOptions, axisOptions],
    A.foldMap(deepMergeMonoid<Highcharts.Options>(true))(I.of),
    configureClickEventIfPresent(props),
  );

  // return null
  return <TreeMapChart {...options} />;
};
