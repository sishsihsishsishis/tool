import { EChartsOption } from 'echarts'

/**
 * heatmap
 */

let L = 300;


// let data = img.map(e=>[e[0],L-e[1],e[2]])
export default async (img:Promise<any[]>):Promise<EChartsOption> => {
  let data = (await img).map(e=>[e[0],L-e[1],e[2]])

  let xData :any[] = [], yData:any[] = [];
  for (let j = 0; j <= L; j++) {
    xData.push(j - L/2);
    yData.push(j - L/2);
  }
  return {
  
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
        // '#D73A21ff'
        // '#D73A21ff'
        '#96B17Aff'
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
        let l = 200
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

          // {
          //   type: 'path',
          //   shape: {
          //     d: 'M2,8 L5,2 L8,8 L5,6 L 2,8',
          //     x: -10,
          //     y: -20 - l,
          //     width: 20,
          //     height: 40
          //   },

          // }, {
          //   type: 'path',
          //   shape: {
          //     d: 'M2,2 L8,5 L2,8 L4,5 L 2,2',
          //     x: -10 + l,
          //     y: -20,
          //     width: 20,
          //     height: 40
          //   },

          // },
          // {
          //   type: 'path',
          //   shape: {
          //     d: 'M2,2 L5,8 L8,2 L 5,4 L 2,2',
          //     x: -10 ,
          //     y: -20 + l,
          //     width: 20,
          //     height: 40
          //   },

          // }, {
          //   type: 'path',
          //   shape: {
          //     d: 'M2,5 L8,2 L6,5 L8,8 L 2,5',
          //     x: -10 - l,
          //     y: -20 ,
          //     width: 20,
          //     height: 40
          //   },
          // },

          {
            type: 'group',
            x:0,
            y:-45 - l,
            children:[
              {
                type: 'text',
                 style:{
                   text:'Alert, Awake, Attentive',
                   fontSize:18,
                   textAlign:'center',
                   fontFamily:'inter'
                 }
              },
              {
                type: 'text',
                y:18,
                 style:{
                   text:'High',
                   fontSize:18,
                   textAlign:'center',
                   fill:'red',
                   fontFamily:'inter'
                 }
              },
            ]
          },
          {
            type: 'group',
            x: 0,
            y: 8 + l,
            children:[
              {
                type: 'text',
                 style:{
                   text:'',
                   fontSize:18,
                   textAlign:'center',
                   fontFamily:'inter'
                 }
              },
              {
                type: 'text',
                y:18,
                 style:{
                   text:'Low',
                   fontSize:18,
                   textAlign:'center',
                   fill:'red',
                   fontFamily:'inter'
                 }
              },
            ]
          },
          {
            type: 'group',
            x: 54 + l,
            y: -18,
            children:[
              {
                type: 'text',
                 style:{
                   text:'Emotion',
                   fontSize:18,
                   textAlign:'center',
                   fontFamily:'inter'
                 }
              },
              {
                type: 'text',
                y:18,
                style:{
                  text:'Positive',
                  fontSize:18,
                  textAlign:'center',
                  fill:'red',
                  fontFamily:'inter'
                }
              },
            ]
          },
          {
            type: 'group',
            x: -54 - l,
            y: -18,
            children:[
              {
                type: 'text',
                style:{
                  text:'Emotion',
                  fontSize:18,
                  textAlign:'center',
                  fontFamily:'inter'
                }
              },
              {
                type: 'text',
                y:18,
                style:{
                  text:'Negative',
                  fontSize:18,
                  textAlign:'center',
                  fill:'red',
                  fontFamily:'inter'
                }
              },
            ]
          },
          {
            type: 'text',
            x:48,
            y:-36,
            style:{
              text:'Indifference\nApathy',
              fontSize:16,
              textAlign:'center',
              fontFamily:'inter'
            }
          },
          //第一象限
          {
            type: 'text',
            x:l - 56,
            y:12-l,
            style:{
              text:'Active Listening,\ndeep engagement',
              fontSize:16,
              textAlign:'center',
              fontFamily:'inter'
            }
          },
          {
            type: 'text',
            x:l ,
            y: -80,
            style:{
              text:'Camaraderie,\nAlignment',
              fontSize:16,
              textAlign:'center',
              fontFamily:'inter'
            }
          },
          //第二象限
          {
            type: 'text',
            x: 108,
            y: 24,
            style:{
              text:'Collective\nInterest/Curiosity',
              fontSize:16,
              textAlign:'center',
              fontFamily:'inter'
            }
          },
          {
            type: 'text',
            x: l ,
            y: 80,
            style:{
              text:'Empathy',
              fontSize:16,
              textAlign:'center',
              fontFamily:'inter'
            }
          },
          {
            type: 'text',
            x: l - 72 ,
            y: l - 24,
             style:{
               text:'Passive Listening,\nIntermittent\nattention',
               fontSize:16,
               textAlign:'center',
               fontFamily:'inter'
             }
          },
          //第三象限
          {
            type: 'text',
            x: 12-l ,
            y: 60,
             style:{
               text:'No Cohesion',
               fontSize:16,
               textAlign:'center',
               fontFamily:'inter'
             }
          },
          {
            type: 'text',
            x: 72-l ,
            y: l - 24,
             style:{
               text:'Bored Relations,\nChecked out',
               fontSize:16,
               textAlign:'center',
               fontFamily:'inter'
             }
          },
          //第四象限
          {
            type: 'text',
            x: 56-l ,
            y: 12-l,
             style:{
               text:'Antagonism,\nHostility',
               fontSize:16,
               textAlign:'center',
               fontFamily:'inter'
             }
          },
          {
            type: 'text',
            x: -l ,
            y: -80,
             style:{
               text:'Negative Criticism,\nBlame',
               fontSize:16,
               textAlign:'center',
               fontFamily:'inter'
             }
          },
          ]
        };
      },
      clip: true,
      data: [1]
    }
  ]
} as EChartsOption
}