import Chart from 'highcharts/highstock';
import HighchartReact from 'highcharts-react-official';
import type * as Highcharts from 'highcharts';

const genRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const getRandomArray = (length: number, min: number, max: number) =>
  Array.from({ length }, () => genRandom(min, max));
const options = (props: { title: string }) =>
  ({
    chart: {
      height: 160,
      showAxes: false,
      type: 'spline',
    },
    title: {
      text: props.title,
    },
    xAxis: {
      labels: { enabled: false },
    },
    yAxis: {
      labels: { enabled: false },
    },

    series: [
      {
        data: getRandomArray(32, 0, 100).map(v => ({ y: v })),
        type: 'spline',
      },
    ],
  } satisfies Highcharts.Options);

export const NotImplementedChart = ({
  title = 'Cool chart',
}: {
  title?: string;
}) => {
  // return null;
  return (
    <div className={'w-full'}>
      <HighchartReact highcharts={Chart} options={options({ title })} />
    </div>
  );
};
