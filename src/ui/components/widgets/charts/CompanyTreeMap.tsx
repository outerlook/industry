import Highcharts from 'highcharts';
import { pipe } from 'effect';
import type { validTypes } from '@services/api/validation/valid-types';
import { TreeMapChart } from './TreemapChart';
import { propsToCompanyTree, toTreemapData } from './company-tree-builder';

const baseOptions = {
  title: {
    // @ts-expect-error don't know why isn't valid
    text: null,
  },
  plotOptions: {
    treemap: {
      layoutAlgorithm: 'squarified',
      alternateStartingDirection: true,
      events: {
        click: event => {
          console.log(event.point.options);
        },
      },
      // TODO MAYBE SHOULDN'T BE HARDCODED
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
          borderColor: 'black',
          borderWidth: 1,
          dataLabels: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            style: {
              fontSize: '10px',
              fontWeight: 'bold',
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

export type TreeMapProps = {
  companies: validTypes['Company'][];
  units: validTypes['Unit'][];
  assets: validTypes['Asset'][];
};

export const CompanyTreeMap = (props: TreeMapProps) => {
  const options = {
    ...baseOptions,
    // repeating red to green 3 times, so maximum number of companies is 3 now, as it's a demo, and all green
    // because max health = max green
    // todo: add colors for different companies?
    ...pipe(
      propsToCompanyTree(props),
      toTreemapData([
        // red to green
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
        ['#ff0000', '#00ff00'],
      ])
    ),
  };

  return <TreeMapChart {...options} />;
};
