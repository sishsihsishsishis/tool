import { EChartOption } from 'echarts'
import sync from '../../../data/do/rppg_power/rppg_sync_smooth.json'
import va from '../../../data/do/heatmap/va_h.json'
import color from "./color";
let data:any = va;
// for(let i in sync.Synchrony)
// {
//     data[i] = [sync.Synchrony[i][0],1.1*Math.random(),1.1*Math.random(),300*(Math.random()-0.5),300*(Math.random()-0.5)]
// }
// let data = [
//     {x:1.1,y:1.1},
//     {x:1.1,y:1.1},
//     {x:1.1,y:1.1},
//     {x:1.1,y:1.1},
//     {x:1.1,y:1.1},
//     {x:1.1,y:1.1},
//     {x:1.1,y:1.1},
//     {x:1.1,y:1.1},
// ]

let L = 300
let width = 900
let height = 700
let user = ['00','01','02','10','11','12']

export default {
    timeline:{
      type:'number',
      data:data.map((e:any)=>e[0]),
      show:false
    },
    xAxis:{
        max:300,
        show:false
    },
    yAxis:{
        max:300,
        show:false
    },
    graphic:{
        type: 'circle',
    //   left: 'center',
    //   top: 'center',
    }, 
    series:[{
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
                y1: 5,
                x2: -l,
                y2: 5,
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
              type: 'group',
              x:0,
              y:-45 - l,
              children:[
                {
                  type: 'text',
                   style:{
                     text:'Attentiveness',
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
                     text:'Attentiveness',
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
      }],
    options:data.map((e:any)=>{
        return {
            graphic: [{
            type: 'circle',
            x:width/2 + ((e[1][0] as number) - 0 )* 300,
            y:height/2 - ((e[1][1] as number) - 0 ) * 300,
            scaleX:e[1][2]*3,
            scaleY:e[1][3]*3,
            shape: {
                
              r: 100,
            },
            style: {
              fill: '#A0BD8075'
            },
          },...user.map((u:any,index:number)=> {return {
            type: 'circle',
            x:width/2 + ((e[2+index][0] as number) - 0 )* 300,
            y:height/2 - ((e[2+index][1] as number) - 0 ) * 300,
            scaleX:1,
            scaleY:1,
            shape: {
                
              r: 5,
            },
            style: {
              fill: color[u]
            },
          }}),]
        }
    })
  } as EChartOption;