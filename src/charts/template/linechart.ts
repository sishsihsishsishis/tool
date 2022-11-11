import { EChartOption } from 'echarts'
import { graphic } from "echarts";
import color from "./color";
import merge from "deepmerge";
import marks from "../../../data/do/marks/user_marks.json"
import { startTime } from './time';

export function LineChart(data: any, key: string, mul: boolean, customOpt?: EChartOption) {
  if (mul) {
    const opt: EChartOption = {
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
          return Math.floor(value.max * 10**p + 1) / 10**p;
        },
        boundaryGap: [0, '100%']
      },
      legend: {
        data: Object.keys(data).map(e => e == 'Synchrony' ? 'Synchrony' : e == 'avg' ? 'Avg' : `User${e}`).sort()
      },
      series: Object.keys(data).map(e => {
        return {
          name: e == 'Synchrony' ? 'Synchrony' : e == 'avg' ? 'Avg' : `User${e}`,
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: data[e],
          lineStyle: e == 'avg' || e == 'Synchrony' ? {
            width: 4,
            color: color[key] + 'cc',
          } : {},
          itemStyle: {
            color: e == 'avg' || e == 'Synchrony' ? color[key] + 'cc' : color[e],
          },
          markArea: (e == 'Synchrony' || e == 'avg') ? {
            data: marks["team"].map((m: any, index: number) => [
              {
                name: '',
                itemStyle: { color: color[key] + '75' },
                xAxis: startTime + parseInt(m.start) * 1000
              },
              {
                xAxis: startTime + parseInt(m.end) * 1000
              }]
            ),
          } : {}
        }
      })
    }
    return customOpt ? merge<EChartOption>(opt, customOpt) as EChartOption : opt;
  } else {
    const opt: EChartOption = {
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
          return Math.floor(value.max * 10**p + 1) / 10**p;
        },
        boundaryGap: [0, '100%']
      },
      legend: {
        data: Object.keys(data).map(e => e == 'Synchrony' ? 'Synchrony' : e == 'avg' ? 'Avg' : `User${e}`).sort()
      },
      series: Object.keys(data).map(e => {
        return {
          name: e == 'Synchrony' ? 'Synchrony' : e == 'avg' ? 'Avg' : `User${e}`,
          type: 'line',
          smooth: true,
          symbol: 'none',
          data: data[e],
          lineStyle: e == 'avg' || e == 'Synchrony' ? {
            width: 4,
            color: color[key] + 'cc',
          } : {},
          itemStyle: {
            color: e == 'avg' || e == 'Synchrony' ? color[key] + 'cc' : color[e],
          },
          // markArea: {
          markArea: (e == 'Synchrony' || e == 'avg') ? {} : {
            label: {
              rotate: 35,
              offset: [25, 0]
            },
            data: marks[e].map((m: { start: string, end: string, label?: number }, index: number) =>
              [{
                name: 'section ' + (index + 1),
                xAxis: startTime + parseInt(m.start) * 1000,
                itemStyle: {
                  color: `${color[e]}75`
                }
              },
              {
                xAxis: startTime + parseInt(m.end) * 1000,
              },
              ])
          }
        }
      })
    }
    return customOpt ? merge<EChartOption>(opt, customOpt) as EChartOption : opt;
  }
  // return Object.assign(opt,customOpt) as EChartOption
}