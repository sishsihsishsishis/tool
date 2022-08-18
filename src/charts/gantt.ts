// import spk from "../../data/gantt/spk.json";
import spk from "../../data/gantt/new_speak_emotions.json";
import dialogu from "../../data/gantt/new_speak_dialogueacts.json";
import { graphic } from "echarts";
let data = [];
// var startTime = +new Date();

let categories = spk.speakers.sort().reverse();

export let types = {
    'Neutral' : '#FF7410',
    'Positive' : '#2B9529',
    'Negative' : '#226BA9',
    'Very Negative' : '#D02226',
    'Very Positive' : '#8A5BB2',
}

data = spk.data.map(e=>{
    return {
        name: e.Resource,
        value: [categories.findIndex(i=>i==e.Task), e.Start, e.Finish, new Date(e.Finish) - new Date(e.Start),e.Resource],
        itemStyle: {
            color: types[e.Resource]
        }
      }
})
export default {
  tooltip: {
    formatter: function (params:any) {
      return params.marker + params.name + ': ' + params.value[3]/1000 + ' s';
    }
  },
  dataZoom: [
    {
      type: 'slider',
      filterMode: 'weakFilter',
      showDataShadow: false,
      top: 400,
      labelFormatter: ''
    },
    {
      type: 'inside',
      filterMode: 'weakFilter'
    }
  ],
  grid: {
    height: 300
  },
  legend:{
    data:Object.keys(types)
  },
  xAxis: {
    type:'time',
    // min: startTime,
    // max:startTime+3000*1000,
    scale: true,
    axisLabel: {
      // formatter: function (val) {
      //   return Math.max(0, val)/1000 + ' s';
      // }
    }
  },
  yAxis: {
    data: categories//.sort((a,b)=>a<b)
  },
  series: [
    {
      type: 'custom',
      renderItem: function (params, api) {
        var categoryIndex = api.value(0);
        var start = api.coord([api.value(1), categoryIndex]);
        var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, 1])[1] * 0.6;
        var rectShape = graphic.clipRectByRect(
          {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          },
          {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
          }
        );
        return (
          rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
          }
        );
      },
      itemStyle: {
        opacity: 0.8
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: data
    }
  ]
};

let data2 = [];
// var startTime = +new Date();

let categories2 = dialogu.speakers.sort().reverse();

export let types2 = {
    'Uninterpretable' : '#84584E',
    'Statement-opinion' : '#8E69B8',
    'Statement-non-opinion' : '#C53932',
    'Yes-No-Question' : '#D57DBE',
    'Collaborative Completion' : '#EF8636',
    'Abandoned or Turn-Exit' : '#3B75AF',
    'Others' : '#529E3E',
}

data2 = dialogu.data.map(e=>{
    return {
        name: e.Resource,
        value: [categories2.findIndex(i=>i==e.Task), e.Start, e.Finish, new Date(e.Finish) - new Date(e.Start),e.Resource],
        itemStyle: {
            color: types2[e.Resource]
        }
      }
})

export const dialog = {
  tooltip: {
    formatter: function (params:any) {
      return params.marker + params.name + ': ' + params.value[3]/1000 + ' s';
    }
  },
  dataZoom: [
    {
      type: 'slider',
      filterMode: 'weakFilter',
      showDataShadow: false,
      top: 400,
      labelFormatter: ''
    },
    {
      type: 'inside',
      filterMode: 'weakFilter'
    }
  ],
  grid: {
    height: 300
  },
  legend:{
    data:Object.keys(types2)
  },
  xAxis: {
    type:'time',
    // min: startTime,
    // max:startTime+3000*1000,
    scale: true,
    axisLabel: {
      // formatter: function (val) {
      //   return Math.max(0, val)/1000 + ' s';
      // }
    }
  },
  yAxis: {
    data: categories2//.sort((a,b)=>a<b)
  },
  series: [
    {
      type: 'custom',
      renderItem: function (params, api) {
        var categoryIndex = api.value(0);
        var start = api.coord([api.value(1), categoryIndex]);
        var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, 1])[1] * 0.6;
        var rectShape = graphic.clipRectByRect(
          {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          },
          {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
          }
        );
        return (
          rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
          }
        );
      },
      itemStyle: {
        opacity: 0.8
      },
      encode: {
        x: [1, 2],
        y: 0
      },
      data: data2
    }
  ]
};