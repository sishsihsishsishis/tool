import { EChartOption } from 'echarts'
import data from '../../data/arousal_signal/a2.json'
import { LineChart } from "./template/linechart";

/**
 * arousal_signal
 */

function chunk(arr:Array<any>,len:number){
  const ArrayList = [] 
  let index = 0 
  while (index < arr.length) { 
      ArrayList.push(arr.slice(index, index += len)) 
  }
  return ArrayList;
}

const average = (arr:Array<any>) => arr.reduce((a, b) => a + b) / arr.length;
let smoothParam = 100
for(let k in data){
  let t = data[k];
  data[k] = chunk(t,smoothParam).map((e,index)=>{
    return [index*smoothParam,average(e.map(x=>parseFloat(x[1])))]
  })
}
let avg = {avg:data.avg}
// delete data.avg;
export default async function () {

  return LineChart(data)
}
export async function arousal_signal_avg () {
  return LineChart(avg)
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
