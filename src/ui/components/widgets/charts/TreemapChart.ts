import {BaseChart, fromModuledHighcharts} from "./BaseChart";
import Highcharts from 'highcharts'
import TreeMapModule from 'highcharts/modules/treemap'
import HeatmapModule from 'highcharts/modules/heatmap'

TreeMapModule(Highcharts)
HeatmapModule(Highcharts)

export const TreeMapChart = fromModuledHighcharts(Highcharts)