import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React from 'react';

export const BaseChart = (
  props: Highcharts.Options & {
    highcharts?: typeof Highcharts;
  }
) => {
  const { highcharts = Highcharts, ...chartOptions } = props;

  return (
    <HighchartsReact
      containerProps={{ style: { height: '100%', width: '100%' } }}
      options={chartOptions}
      highcharts={highcharts}
    />
  );
};

export const fromModuledHighcharts =
  (highcharts: typeof Highcharts) =>
  (props: Omit<React.ComponentProps<typeof BaseChart>, 'highcharts'>) =>
    BaseChart({ ...props, highcharts });
