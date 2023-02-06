import { EChartsOption } from 'echarts'
import color from "./color";
import merge from "deepmerge";

const isSpec = (key: string) => {
  return key.includes('mean') || key.includes('sync')
}

export function LineChart(data: any, specColorKey: string, single: boolean, marks:{ [key: string]: { start: number, end: number, label?: number }[] }, customOpt?: EChartsOption) {
  const opt: EChartsOption = {
    grid: {
      top: 60,
      left: 100,
      right: 100,
      bottom: 60
    },
    tooltip: {},
    xAxis: {
      type: 'time',
    },
    yAxis: {
      show: false,
      type: 'value',
      max: function (value: any) {
        let p = value.max.toString().split('.')[1].length
        return Math.floor(value.max * 10 ** p + 1) / 10 ** p;
      },
      boundaryGap: [0, '100%']
    },
    legend: {
      data: Object.keys(data)
    },
    series: Object.keys(data).map(e => {
      return {
        name: e,
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: data[e],
        sampling: 'lttb',
        lineStyle: isSpec(e) ? {
          width: 4,
          color: color[specColorKey] + 'cc',
        } : {},
        itemStyle: {
          color: isSpec(e) ? color[specColorKey] + 'cc' : color[e],
        },
        markArea: single ? {
          data: marks["team"].map((m: any, index: number) => [
            {
              name: '',
              itemStyle: { color: color[specColorKey] + '75' },
              xAxis: parseInt(m.start)
            },
            {
              xAxis: parseInt(m.end)
            }]
          ),
        } : marks.hasOwnProperty(e) ? {
          label: {
            rotate: 35,
            offset: [25, 0]
          },
          data: (marks as { [key: string]: { start: number, end: number, label?: number }[] })[e].map((m, index) =>
            [{
              name: 'section ' + (index + 1),
              xAxis: m.start,
              itemStyle: {
                color: `${color[e]}75`
              }
            },
            {
              xAxis: m.end,
            },
            ])
        } : {}
      }
    })
  }
  return customOpt ? merge<EChartsOption>(opt, customOpt) as EChartsOption : opt;
}