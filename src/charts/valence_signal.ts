import { EChartOption } from 'echarts'
import data from '../../data/valence_signal/v2.json'
import sync from '../../data/valence_signal/valence_sync.json'
import { chunk, average,transTime } from "../utils";
import { LineChart } from "./template/linechart";
import { startTime } from "./template/time";
/**
 * valence_signal
 */

let smoothParam = 100
for (let k in data) {
  let t = data[k];
  data[k] = chunk(t, smoothParam).map((e, index) => {
    return transTime(startTime,[index * smoothParam, average(e.map(x => parseFloat(x[1])))])
  })
}
for(let i in sync.valence_sync){
  sync.valence_sync[i][0] = startTime + sync.valence_sync[i][0]*30 * 1000
}
let sync_data = {
  Synchrony:sync.valence_sync
}
export default async function () {
  return LineChart(data,'behavior')
}

export async function valence_signal_syn () {
  return LineChart(sync_data,'behavior')
}
// console.log(data)
// export default {
//   grid: {
//     top: 40,
//     left: 40,
//     right: 40,
//     bottom: 40
//   },
//   tooltip: {},
//   xAxis: {
//     type: 'value',
//   },
//   yAxis: {
//     type: 'value',
//     max: function (value: any) {
//       return Math.floor(value.max * 10 + 1) / 10;
//     },
//     boundaryGap: [0, '100%']
//   },
//   legend: {
//     data: Object.keys(data).map(e => e == 'avg' ? 'Avg' : `User${e}`)
//   },
//   series: Object.keys(data).map(e => {
//     return {
//       name: e == 'avg' ? 'Avg' : `User${e}`,
//       type: 'line',
//       smooth: true,
//       symbol: 'none',
//       data: data[e],
//       lineStyle: e == 'avg' ? {
//         width: 3,
//         color: "#00000077",
//       } : {},
//       itemStyle: {
//         color: color[e],
//       }
//     }
//   })
// }
