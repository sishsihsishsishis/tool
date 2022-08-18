import { EChartOption } from 'echarts'
import color from "./color";

export function LineChart(data:any, key:string, customOpt?:EChartOption){
    const opt = {
        grid: {
          top: 40,
          left: 40,
          right: 40,
          bottom: 40
        },
        tooltip: {},
        xAxis: {
          type: 'time',
        },
        yAxis: {
          type: 'value',
          max: function (value: any) {
            return Math.floor(value.max * 10 + 1) / 10;
          },
          boundaryGap: [0, '100%']
        },
        legend: {
          data: Object.keys(data).map(e => e =='Synchrony'? 'Synchrony' :e == 'avg' ? 'Avg' : `User${e}`).sort()
        },
        series: Object.keys(data).map(e => {
          return {
            name: e =='Synchrony'? 'Synchrony' : e == 'avg' ? 'Avg' : `User${e}`,
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: data[e],
            lineStyle: e == 'avg' || e == 'Synchrony' ? {
              width: 4,
              color: color[key]+'cc',
            } : {},
            itemStyle: {
              color: e == 'avg' || e == 'Synchrony' ? color[key]+'cc' : color[e],
            }
          }
        })
      }
    return Object.assign(opt,customOpt) as EChartOption
}