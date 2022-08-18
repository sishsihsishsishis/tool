import { EChartOption } from 'echarts'
import data from '../../data/rppg_signal/mav.json'
import { chunk, average,transTime } from "../utils";
import { LineChart } from "./template/linechart";
import { startTime } from "./template/time";

/**
 * rppg_signal
 */
let smoothParam = 100
for(let k in data){
  let t = data[k];
  data[k] = chunk(t,smoothParam*25).map((e,index)=>{
    return transTime(startTime,[index*smoothParam,average(e.map(x=>parseFloat(x[1])))])
  })
}
//---------
delete data.time;

export default async function () {

  return LineChart(data,'rppg', {
    yAxis: {
      max: function (value: any) {
        return Math.floor(value.max * 100 + 1) / 100;
      }
    }
  })
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
//   //   min:function (value:any) {
//   //     return Math.floor(value.min - 1);
//   // },
//   max:function (value:any) {
//     return Math.floor(value.max*100+1)/100;
//   },
//     boundaryGap: [0, '100%']
//   },
//   legend: {
//     data: Object.keys(data).filter(e=>e!='time').map(e=>e=='avg'?'Avg':`User${e}`)
//   },
//   series: Object.keys(data).filter(e=>e!='time').map(e=>{
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
