import { flow } from 'effect';
import { BaseChart } from './BaseChart';

const processPieOptions = ({
  data,
}: {
  data: { name: string; value: number }[];
}): React.ComponentProps<typeof BaseChart> => ({
  chart: {
    type: 'pie',
  },
  // disable label annotations

  plotOptions: {

    pie: {
      dataLabels: {
        enabled: false
      },
    },
  },
  // disable title

  title: {
    text: null,
  },

  series: [
    {
      name: 'Count',
      data: data.map(({ name, value }) => [name, value]),
      type: 'pie',
    },
  ],
});

export const PieChart = flow(processPieOptions, BaseChart);
