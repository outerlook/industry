import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

export const BaseChart = (props: Highcharts.Options) => {
  return (
    <HighchartsReact
      containerProps={{ style: { height: '100%', width: '100%' } }}
      highcharts={Highcharts}
      options={props}
    />
  );
};
