import { EChartOption } from 'echarts'
import sync from '../../../data/do/rppg_power/rppg_sync_smooth.json'
import va from '../../../data/do/heatmap/va_1102.json'
import color from "./color";
let data: any = va;

let user = ['Team', 'User00', 'User01', 'User02', 'User10', 'User11', 'User12']
function renderItem(params: any, api: any) {
  let v = api.value(0) * 10;
  let a = api.value(1) * 10;
  let r_v = api.value(2);
  let r_a = api.value(3);
  let [x, y] = api.coord([v, a]);
  let r = api.size([1, 1])[1] * 10;
  return {
    type: 'group',
    children: [
      {
        type: 'circle',
        // x: x,
        // y: y,
        shape: {
          cx: x,
          cy: y,
          r: r * 0.01
        },
        // style: api.style()
        style: {
          fill: api.visual("color")
        }
        // style: {
        //   fill: '#A0BD80'
        // }
      }
    ]
  };
}
function TeamRenderItem(params: any, api: any) {
  let v = api.value(0) * 10;
  let a = api.value(1) * 10;
  let r_v = api.value(2)=="null" ? 0 : api.value(2);
  let r_a = api.value(3)=="null" ? 0 :api.value(3);
  let [x, y] = api.coord([v, a]);
  let [x0, y0] = api.coord([1, 1]);
  let [x00, y00] = api.coord([-1, -1]);
  console.log(r_v,r_a)
  let r = api.size([1, 1])[1] * 10;
  return {
    type: 'group',
    children: [
      {
        type: 'circle',
        x: x,
        y: y,
        scaleX: r_v,
        scaleY: r_a,
        originX: 0,
        originY: 0,
        shape: {
          // cx:  x,
          // cy:  y ,
          r: r * 2
        },
        style: {
          fill: api.visual("color") + '75'
        }
      },
      {
        type: 'circle',
        // x: x,
        // y: y,
        shape: {
          cx: x,
          cy: y,
          r: r * 0.005
        },
        // style: api.style()
        style: {
          fill: api.visual("color")
        }
      },
    ]
  };
}
export default {
  timeline: {
    type: 'number',
    data: data.map((e: any) => e[0]),
    show: false
  },
  xAxis: {
    name: 'x',
    min: -6,
    max: 6,
    show:false,
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
    show:false,
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
  options: data.map((m: any) => {
    let Tmarks = m[1]
    let Umarks = [m[1], m[2], m[3], m[4], m[5], m[6], m[7]]
    return {
      series: [...Umarks.map((um: any, index: number) => {
        return {
          name: user[index],
          type: 'custom',
          renderItem: index == 0 ? TeamRenderItem : renderItem,
          coordinateSystem: 'cartesian2d',
          itemStyle: {
            opacity: 0.8,
            color: color[user[index]],
            fill: color[user[index]]
          },
          encode: {
            x: 0,
            y: 1
          },

          data: [
            um
          ],
          animation: false
        }
      }),{
        name: 'displayTxt',
        type: 'custom',
        renderItem: displayTxt,
        data:[[]]
      }]
    }
  }),
} as EChartOption;

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
        x:api.coord([0, 6])[0],
        y:api.coord([0, 6])[1],
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
        x:api.coord([0, -5])[0],
        y:api.coord([0, -5])[1],
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
        x:api.coord([5, 0.5])[0],
        y:api.coord([5, 0.5])[1],
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
        x:api.coord([-5, 0.5])[0],
        y:api.coord([-5, 0.5])[1],
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
        x:api.coord([0.2, 0.9])[0],
        y:api.coord([0.2, 0.9])[1],
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
        x:api.coord([2.7, 4.5])[0],
        y:api.coord([2.7, 4.5])[1],
        style: {
          text: 'Active Listening,\ndeep engagement',
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'inter'
        }
      },
      {
        type: 'text',
        x:api.coord([4.5, 2.7])[0],
        y:api.coord([4.5, 2.7])[1],
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
        x:api.coord([1.8, -0.5])[0],
        y:api.coord([1.8, -0.5])[1],
        style: {
          text: 'Collective\nInterest/Curiosity',
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'inter'
        }
      },
      {
        type: 'text',
        x:api.coord([4.5, -2.7])[0],
        y:api.coord([4.5, -2.7])[1],
        style: {
          text: 'Empathy',
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'inter'
        }
      },
      {
        type: 'text',
        x:api.coord([2.7, -4.5])[0],
        y:api.coord([2.7, -4.5])[1],
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
        x:api.coord([-4.5, -2.7])[0],
        y:api.coord([-4.5, -2.7])[1],
        style: {
          text: 'No Cohesion',
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'inter'
        }
      },
      {
        type: 'text',
        x:api.coord([-2.7, -4.5])[0],
        y:api.coord([-2.7, -4.5])[1],
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
        x:api.coord([-4.5, 2.7])[0],
        y:api.coord([-4.5, 2.7])[1],
        style: {
          text: 'Antagonism,\nHostility',
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'inter'
        }
      },
      {
        type: 'text',
        x:api.coord([-2.7, 4.5])[0],
        y:api.coord([-2.7, 4.5])[1],
        style: {
          text: 'Negative Criticism,\nBlame',
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'inter'
        }
      },
    ]
  }
}