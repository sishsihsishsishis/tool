import { EChartOption } from 'echarts'
import color from "./color";

export function LineChart(data:any, customOpt?:EChartOption){
    const opt = {
        grid: {
          top: 40,
          left: 40,
          right: 40,
          bottom: 40
        },
        tooltip: {},
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'value',
          max: function (value: any) {
            return Math.floor(value.max * 10 + 1) / 10;
          },
          boundaryGap: [0, '100%']
        },
        legend: {
          data: Object.keys(data).map(e => e == 'avg' ? 'Avg' : `User${e}`)
        },
        series: Object.keys(data).map(e => {
          return {
            name: e == 'avg' ? 'Avg' : `User${e}`,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: data[e],
            lineStyle: e == 'avg' ? {
              width: 3,
              color: "#00000077",
            } : {},
            itemStyle: {
              color: color[e],
            }
          }
        })
      }
    return Object.assign(opt,customOpt) as EChartOption
}