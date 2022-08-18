import { EChartOption } from 'echarts'
import data from '../../data/arousal_signal/a2.json'
import sync from '../../data/arousal_signal/arousal_sync.json'
import { chunk, average, transTime } from "../utils";
import { LineChart } from "./template/linechart";
import { startTime } from "./template/time";
/**
 * arousal_signal
 */
let smoothParam = 100
for(let k in data){
  let t = data[k];
  data[k] = chunk(t,smoothParam).map((e,index)=>{
    return transTime(startTime,[index*smoothParam,average(e.map(x=>parseFloat(x[1])))])
  })
}
for(let i in sync.arousal_sync){
  sync.arousal_sync[i][0] = startTime + sync.arousal_sync[i][0]*30 * 1000
}
let sync_data = {
  Synchrony:sync.arousal_sync
}
export default async function () {

  return LineChart(data,'behavior')
}
export async function arousal_signal_syn () {
  return LineChart(sync_data,'behavior')
}

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
//     // boundaryGap: false
//   },
//   yAxis: {
//     type: 'value',
//     max:function (value:any) {
//       return Math.floor(value.max*10+1)/10;
//     },
//     boundaryGap: [0, '100%']
//   },
//   legend: {
//     data: Object.keys(data).map(e=>e=='avg'?'Avg':`User${e}`)
//   },
//   series: Object.keys(data).map(e=>{
//       return {
//         name: e=='avg'?'Avg':`User${e}`,
//         type: 'line',
//         smooth: true,
//         symbol: 'none',
//         data: data[e],
//         lineStyle: e=='avg'?{
//           width:3,
//           color:"#00000077",
//         }:{},
//         itemStyle: {
//           color:color[e],
//         }
       
//       }
//     })
// } 
