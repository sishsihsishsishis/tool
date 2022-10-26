// import spk from "../../data/gantt/spk.json";
import spk from "../../data/gantt/new_speak_emotions.json";
import dialogu from "../../data/gantt/new_speak_dialogueacts.json";
import { graphic } from "echarts";
import { GanttChart } from "./template/ganttchart";
let data = [];
// var startTime = +new Date();

let categories = spk.speakers.sort().reverse();

export let types: {
  [T: string]: string
} = {
  'Neutral': '#FF7410',
  'Positive': '#2B9529',
  'Negative': '#226BA9',
}

const per: {
  [T: string]: number
} = {
  'user00': 24.3,
  'user01': 53.5,
  'user02': 6.1,
  'user10': 3.1,
  'user11': 7.0,
  'user12': 6.0
}
let datas: any = Object.assign({}, types)
for (let i in datas) datas[i] = [];

for (let e of spk.data) {
    datas[e.Resource].push(
    [categories.findIndex(i => i == e.Task), e.Start, e.Finish, new Date(e.Finish).getTime() - new Date(e.Start).getTime(), e.Resource],
  )
}
// console.log(datas)

export default GanttChart(datas,types,categories,{
  yAxis: {
    axisLabel: {
      formatter: (y: string) => `${y} (${per[y]}%)`
    }
  },
})
//  {
//   tooltip: {
//     show:false
//   },
//   dataZoom: [
//     {
//       type: 'slider',
//       filterMode: 'weakFilter',
//       showDataShadow: false,
//       top: 400,
//       labelFormatter: ''
//     },
//     {
//       type: 'inside',
//       filterMode: 'weakFilter'
//     }
//   ],
//   grid: {
//     height: 300
//   },
//   legend: {
//     data: Object.keys(types).map(e => {
//       return {
//         name: e,
//         itemStyle: {
//           color: types[e]
//         }
//       }
//     }),
//   },
//   xAxis: {
//     type: 'time',
//     scale: true,
//   },
//   yAxis: {
//     data: categories,
//     axisLabel: {
//       formatter: (y: string) => `${y} (${per[y]}%)`
//     }
//   },
//   series: Object.keys(datas).map(c => {
//     return {
//       name: c,
//       type: 'custom',
//       renderItem: function (params:any, api:any) {
//         var categoryIndex = api.value(0);
//         var start = api.coord([api.value(1), categoryIndex]);
//         var end = api.coord([api.value(2), categoryIndex]);
//         console.log(api.visual('color'))
//         var height = api.size([0, 1])[1] * 0.6;
//         var rectShape = graphic.clipRectByRect(
//           {
//             x: start[0],
//             y: start[1] - height / 2,
//             width: end[0] - start[0],
//             height: height
//           },
//           {
//             x: params.coordSys.x,
//             y: params.coordSys.y,
//             width: params.coordSys.width,
//             height: params.coordSys.height
//           }
//         );
//         return (
//           rectShape && {
//             type: 'rect',
//             transition: ['shape'],
//             shape: rectShape,
//             style: {
//               fill: types[c]
//             }
//           }
//         );
//       },
//       itemStyle: {
//         opacity: 0.8
//       },
//       encode: {
//         x: [1, 2],
//         y: 0
//       },
//       data: datas[c]
//     }
//   })
// };

let data2 = [];

let categories2 = dialogu.speakers.sort().reverse();

export let types2:{
  [T:string]: string
} = {
  'Uninterpretable': '#84584E',
  'Statement-opinion': '#8E69B8',
  'Statement-non-opinion': '#C53932',
  'Yes-No-Question': '#D57DBE',
  'Collaborative Completion': '#EF8636',
  'Abandoned or Turn-Exit': '#3B75AF',
  'Others': '#529E3E',
}

data2 = dialogu.data.map(e => {
  return {
    name: e.Resource,
    value: [categories2.findIndex(i => i == e.Task), e.Start, e.Finish, new Date(e.Finish).getTime() - new Date(e.Start).getTime(), e.Resource],
    itemStyle: {
      color: types2[e.Resource]
    }
  }
})
let datas2: any = Object.assign({}, types2)
for (let i in datas2) datas2[i] = [];

for (let e of dialogu.data) {
    datas2[e.Resource].push(
    [categories.findIndex(i => i == e.Task), e.Start, e.Finish, new Date(e.Finish).getTime() - new Date(e.Start).getTime(), e.Resource],
  )
}
export const dialog = GanttChart(datas2,types2,categories2,{
  legend:{
   left:'10%',
   right:'10%'
  },
  yAxis: {
    axisLabel: {
      formatter: (y: string) => `${y} (${per[y]}%)`
    }
  },
})
//   tooltip: {
//     formatter: function (params: any) {
//       return params.marker + params.name + ': ' + params.value[3] / 1000 + ' s';
//     }
//   },
//   dataZoom: [
//     {
//       type: 'slider',
//       filterMode: 'weakFilter',
//       showDataShadow: false,
//       top: 400,
//       labelFormatter: ''
//     },
//     {
//       type: 'inside',
//       filterMode: 'weakFilter'
//     }
//   ],
//   grid: {
//     height: 300
//   },
//   // legend:{
//   //   data:Object.keys(types2)
//   // },
//   xAxis: {
//     type: 'time',
//     // min: startTime,
//     // max:startTime+3000*1000,
//     scale: true,
//     axisLabel: {
//       // formatter: function (val) {
//       //   return Math.max(0, val)/1000 + ' s';
//       // }
//     }
//   },
//   yAxis: {
//     data: categories2,
//     axisLabel: {
//       formatter: (y: string) => `${y} (${per[y]}%)`
//     }
//   },
//   series: [
//     {
//       type: 'custom',
//       renderItem: function (params, api) {
//         var categoryIndex = api.value(0);
//         var start = api.coord([api.value(1), categoryIndex]);
//         var end = api.coord([api.value(2), categoryIndex]);
//         var height = api.size([0, 1])[1] * 0.6;
//         var rectShape = graphic.clipRectByRect(
//           {
//             x: start[0],
//             y: start[1] - height / 2,
//             width: end[0] - start[0],
//             height: height
//           },
//           {
//             x: params.coordSys.x,
//             y: params.coordSys.y,
//             width: params.coordSys.width,
//             height: params.coordSys.height
//           }
//         );
//         return (
//           rectShape && {
//             type: 'rect',
//             transition: ['shape'],
//             shape: rectShape,
//             style: api.style()
//           }
//         );
//       },
//       itemStyle: {
//         opacity: 0.8
//       },
//       encode: {
//         x: [1, 2],
//         y: 0
//       },
//       data: data2
//     }
//   ]
// };