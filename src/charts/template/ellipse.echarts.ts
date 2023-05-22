import axios from 'axios';
import { EChartsOption } from 'echarts'
import color from "./color";

function Render(opacity = 1) {
  return function (params: any, api: any) {
    let v = api.value(0) * 6;
    let a = api.value(1) * 6;
    let r_v = api.value(2) == 'null' ? 0 : api.value(2);
    let r_a = api.value(3) == 'null' ? 0 : api.value(3);
    let [x, y] = api.coord([v, a]);
    let r = api.size([1, 1])[1] * 6;
    if (isNaN(v) || isNaN(a)) return null;
    return {
      type: 'group',
      children: [
        {
          type: 'circle',
          x: x,
          y: y,
          scaleX: r_v,
          scaleY: r_a,
          shape: {
            cx: 0,
            cy: 0,
            r: r //* 2
          },
          transition: 'all',
          style: {
            fill: api.visual('color'),
            opacity: 0.5 * opacity
          }
        },
        {
          type: 'circle',
          x: x,
          y: y,
          shape: {
            cx: 0,
            cy: 0,
            r: r * 0.008
          },
          transition: 'all',
          style: {
            fill: api.visual('color'),
            opacity: 1 * opacity
          }
        }
      ]
    };
  };
}


export default async function (meetingId: string) {
  let {timeline,userList,data} = (await axios.get(`/csv/va?meetingID=${meetingId}`)).data.data

  let Data:Array<any> = [];
  for (let i = 0; i < data.length; i++) {
    Data[i] = [data[i]];
    for (let j = 1; j < 8; j++) {
      if (i - j >= 0) Data[i].push(data[i - j]);
    }
  }


  let user = ['Team', ...userList]

  return {
    timeline: {
      type: 'number',
      data: timeline,
      show: false,
      replaceMerge: 'series'
    },
    xAxis: {
      name: 'x',
      min: -6,
      max: 6,
      show: false,
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },
    yAxis: {
      name: 'y',
      min: -6,
      max: 6,
      show: false,
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },
    grid: {
      top: 100
    },
    legend: {
      data: user,
      show: true
    },
    animationDuration:1000,
    animationDurationUpdate:1000,
    // animationEasing:'linear',
    // animationEasingUpdate:'linear',
    // options: timeline.map((m: any, index: number) => {
    //   let Umarks = data[index]
    //   return {
    //     series: [...Umarks.map((um: any, index: number) => {
    //       return {
    //         id:'elli'+index,
    //         name: user[index],
    //         type: 'custom',
    //         universalTransition: true,
    //         renderItem: index == 0 ? TeamRenderItem : renderItem,
    //         coordinateSystem: 'cartesian2d',
    //         itemStyle: {
    //           opacity: 0.8,
    //           color: color[user[index]],
    //           fill: color[user[index]]
    //         },
    //         encode: {
    //           x: 0,
    //           y: 1,
    //           // itemGroupId: index
    //         },
    //         dataGroupId:index,
    //         data: [
    //           um
    //         ],
    //         animation: false
    //       }
    //     }), {
    //       name: 'displayTxt',
    //       type: 'custom',
    //       renderItem: displayTxt,
    //       data: [[]]
    //     }]
    //   }
    // }),
    options: timeline.map((m: any, i: number) => {
      return {
        series: [
          ...Data[i].reduce((p:any[], d:any[], pi:number) => {
            let r = d.map((um: any, index: number) => {
              return {
                id: pi == 0 ? 'elli' + index:null,
                name: user[index],
                type: 'custom',
                renderItem: Render(1 * 0.75**pi),
                coordinateSystem: 'cartesian2d',
                itemStyle: {
                  color: color[user[index]]
                },
                data: [um],
                animation: pi == 0 
              };
            });
            p.push(...r);
            return p;
          }, []),
          {
            name: 'displayTxt',
            type: 'custom',
            renderItem: displayTxt,
            data: [[]]
          }
        ]
      };
    })
  } as EChartsOption;

  function displayTxt(params: any, api: any) {
    let [x0, y0] = api.coord([4, 5]);
    let [x00, y00] = api.coord([-4, -5]);
    let [xo, yo] = api.coord([0, 0]);
    return {
      type: 'group',
      children: [
        {
          type: 'line',
          style: {
            stroke: '#252526',
            lineWidth: 1
          },
          shape: {
            x1: x0,
            y1: yo,
            x2: x00,
            y2: yo,
          }
        },
        {
          type: 'line',
          style: {
            stroke: '#252526',
            lineWidth: 1
          },
          shape: {
            x1: xo,
            y1: y0,
            x2: xo,
            y2: y00,
          }
        },
        {
          type: 'group',
          x: api.coord([0, 6])[0],
          y: api.coord([0, 6])[1],
          children: [
            {
              type: 'text',
              style: {
                text: 'Alert, Awake, Attentive',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'inter'
              }
            },
            {
              type: 'text',
              y: 18,
              style: {
                text: 'High',
                fontSize: 18,
                textAlign: 'center',
                fill: 'red',
                fontFamily: 'inter'
              }
            },
          ]
        },
        {
          type: 'group',
          x: api.coord([0, -5])[0],
          y: api.coord([0, -5])[1],
          children: [
            // {
            //   type: 'text',
            //   style: {
            //     text: 'Alert, Awake, Attentive',
            //     fontSize: 18,
            //     textAlign: 'center',
            //     fontFamily: 'inter'
            //   }
            // },
            {
              type: 'text',
              y: 18,
              style: {
                text: 'Low',
                fontSize: 18,
                textAlign: 'center',
                fill: 'red',
                fontFamily: 'inter'
              }
            },
          ]
        },
        {
          type: 'group',
          x: api.coord([5, 0.5])[0],
          y: api.coord([5, 0.5])[1],
          children: [
            {
              type: 'text',
              style: {
                text: 'Emotion',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'inter'
              }
            },
            {
              type: 'text',
              y: 18,
              style: {
                text: 'Positive',
                fontSize: 18,
                textAlign: 'center',
                fill: 'red',
                fontFamily: 'inter'
              }
            },
          ]
        },
        {
          type: 'group',
          x: api.coord([-5, 0.5])[0],
          y: api.coord([-5, 0.5])[1],
          children: [
            {
              type: 'text',
              style: {
                text: 'Emotion',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'inter'
              }
            },
            {
              type: 'text',
              y: 18,
              style: {
                text: 'Negative',
                fontSize: 18,
                textAlign: 'center',
                fill: 'red',
                fontFamily: 'inter'
              }
            },
          ]
        },
        {
          type: 'text',
          x: api.coord([0.2, 0.9])[0],
          y: api.coord([0.2, 0.9])[1],
          style: {
            text: 'Indifference\nApathy',
            fontSize: 16,
            textAlign: 'left',
            fontFamily: 'inter'
          }
        },
        //第一象限
        {
          type: 'text',
          x: api.coord([2.7, 4.5])[0],
          y: api.coord([2.7, 4.5])[1],
          style: {
            text: 'Active Listening,\ndeep engagement',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        {
          type: 'text',
          x: api.coord([4.5, 2.7])[0],
          y: api.coord([4.5, 2.7])[1],
          style: {
            text: 'Camaraderie,\nAlignment',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        //第二象限
        {
          type: 'text',
          x: api.coord([1.8, -0.5])[0],
          y: api.coord([1.8, -0.5])[1],
          style: {
            text: 'Collective\nInterest/Curiosity',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        {
          type: 'text',
          x: api.coord([4.5, -2.7])[0],
          y: api.coord([4.5, -2.7])[1],
          style: {
            text: 'Empathy',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        {
          type: 'text',
          x: api.coord([2.7, -4.5])[0],
          y: api.coord([2.7, -4.5])[1],
          style: {
            text: 'Passive Listening,\nIntermittent\nattention',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        //第三象限
        {
          type: 'text',
          x: api.coord([-4.5, -2.7])[0],
          y: api.coord([-4.5, -2.7])[1],
          style: {
            text: 'No Cohesion',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        {
          type: 'text',
          x: api.coord([-2.7, -4.5])[0],
          y: api.coord([-2.7, -4.5])[1],
          style: {
            text: 'Bored Relations,\nChecked out',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        //第四象限
        {
          type: 'text',
          x: api.coord([-4.5, 2.7])[0],
          y: api.coord([-4.5, 2.7])[1],
          style: {
            text: 'Negative Criticism,\nBlame',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
        {
          type: 'text',
          x: api.coord([-2.7, 4.5])[0],
          y: api.coord([-2.7, 4.5])[1],
          style: {
            text: 'Antagonism,\nHostility',
            fontSize: 16,
            textAlign: 'center',
            fontFamily: 'inter'
          }
        },
      ]
    }
  }
}