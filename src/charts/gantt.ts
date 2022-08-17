// import spk from "../../data/gantt/spk.json";
import spk from "../../data/gantt/new_speak_emotions.json";
import { graphic } from "echarts";
let data = [];
// var startTime = +new Date();

let categories = spk.speakers;

let types = {
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
    formatter: function (params) {
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