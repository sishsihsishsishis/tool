import { EChartOption } from 'echarts'
import img from '../../data/heatmap/1_3.json'

/**
 * heatmap
 */

let L = 300;
let xData = [], yData = [];
for (let j = 0; j <= L; j++) {
  xData.push(j - L/2);
  yData.push(j - L/2);
}
let data = img//.map(e=>[e[0],e[1],e[2]])
export default {
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    show:false,
    data: xData,
  },
  yAxis: {
    type: 'category',
    show:false,
    data: yData
  },
  visualMap: {
    min: 0,
    max: 255,
    show: false,
    // left: 'right',
    // top: 'center',
    calculable: true,
    realtime: false,
    // splitNumber: 255,
    inRange: {
      color: [
        '#ffffff00',
        '#D73A21ff'
        // '#EA382500'
      ]
    }
  },
  series: [
    {
      name: 'Value',
      type: 'heatmap',
      data: data,
      emphasis: {
        itemStyle: {
          borderColor: '#333',
          borderWidth: 1
        }
      },
      //   itemStyle: {
      //     normal: {
      //         shadowColor: 'rgba(0,0,0,0.5)',
      //         shadowOffsetX: 0,
      //         shadowOffsetY: 0,
      //         shadowBlur: 0,//16
      //     },
      // },
      progressive: 1000,
      animation: false
    },
    {
      type: 'custom',
      renderItem: function (params:any, api:any) {
        let l = 250
        const coord = api.coord([L/2, L/2])
        return {
          type: 'group',
          x: coord[0],
          y: coord[1],
          children: [{
            type: 'line',
            style: {
              stroke: '#252526',
              lineWidth: 1
            },
            shape: {
              x1: l,
              y1: 0,
              x2: -l,
              y2: 0,
            }
          }, {
            type: 'line',
            style: {
              stroke: '#252526',
              lineWidth: 1
            },
            shape: {
              x1: 0,
              y1: l,
              x2: 0,
              y2: -l,
            }
          },
          {
            type: 'line',
            style: {
              stroke: '#252526',
              lineWidth: 1
            },
            shape: {
              x1: l/1.414,
              y1: -l/1.414,
              x2: -l/1.414,
              y2: l/1.414,
            }
          }, {
            type: 'line',
            style: {
              stroke: '#252526',
              lineWidth: 1
            },
            shape: {
              x1: l/1.414,
              y1: l/1.414,
              x2: -l/1.414,
              y2: -l/1.414,
            }
          },
          {
            type: 'path',
            shape: {
              d: 'M2,8 L5,2 L8,8 L5,6 L 2,8',
              x: -10,
              y: -20 - l,
              width: 20,
              height: 40
            },

          }, {
            type: 'path',
            shape: {
              d: 'M2,2 L8,5 L2,8 L4,5 L 2,2',
              x: -10 + l,
              y: -20,
              width: 20,
              height: 40
            },

          },
          {
            type: 'path',
            shape: {
              d: 'M2,2 L5,8 L8,2 L 5,4 L 2,2',
              x: -10 ,
              y: -20 + l,
              width: 20,
              height: 40
            },

          }, {
            type: 'path',
            shape: {
              d: 'M2,5 L8,2 L6,5 L8,8 L 2,5',
              x: -10 - l,
              y: -20 ,
              width: 20,
              height: 40
            },

          },{
            type: 'text',
            x:-80  + l,
              y:5,
             style:{
               text:'Pleasure',
               fontSize:18
             }
          },
          {
            type: 'text',
            x:-50  + l,
              y:-40,
             style:{
               text:'Satisfaction'
             }
          },
          {
            type: 'text',
            x:-50  + l,
              y: 40 - l,
             style:{
               text:'Exraversion'
             }
          },
          {
            type: 'text',
            x:-50  + l,
              y:30,
             style:{
               text:'Happiness'
             }
          },
          {
            type: 'text',
            x:-50  + l,
              y: -30 + l,
             style:{
               text:'Constructive\n thinking'
             }
          },
          {
            type: 'text',
            x:10  - l,
              y:30,
             style:{
               text:'Depression'
             }
          },
          {
            type: 'text',
            x:10  - l,
              y: -30 + l,
             style:{
               text:'Introversion'
             }
          },
          {
            type: 'text',
            x:10  - l,
              y:-40,
             style:{
               text:'Anxiety'
             }
          }, 
          {
            type: 'text',
            x:10  - l,
              y:40 - l,
             style:{
               text:'Neuroticism'
             }
          },
          {
            type: 'text',
            rotation:Math.PI/2,
            // originX:0,
            // originY:0,
            x:-20,
              y:80 - l,
             style:{
               text:'Arousal',
               fontSize:18
             }
          }
          ]
        };
      },
      clip: true,
      data: [1]
    }
  ]
}