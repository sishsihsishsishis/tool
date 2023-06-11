import { EChartsOption } from 'echarts'
import axios from 'axios';
export default async (meetingId: string): Promise<EChartsOption> => {
  let res = (await axios.get(`/csv/va?meetingID=${meetingId}`)).data.data.data

  return {
    backgroundColor: '#1B212F',
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      show: true
    },
    visualMap: {
      min: 0,
      max: 1,
      // orient: 'vertical',
      right: 10,
      bottom: 10,
      text: ['HIGH', 'LOW'],
      textStyle: { color: '#fff' },
      calculable: true,
      inRange: {
        color: [
          '#1B212F',
          '#172048',
          '#1C383B',
          '#214F2E',
          '#256620',
          '#426F1F',
          '#5E771D',
          '#7C801C',
          '#7E711C',
          '#7F621C',
          '#80521B',
          '#68182B'
        ]
      }
    },
    dataset: { source: res.map((e: any[][]) => [e[0][0], e[0][1], (e[0][2] + e[0][3]) / 2]) },
    geo: {
      map: 'empty',
      // show: false,
      roam: true,
      center: [0, 0],
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zoom: 1,
      scaleLimit: { min: 1, max: 5 },
      boundingCoords: [
        // 定位左上角经纬度
        [-1, 1],
        // 定位右下角经纬度
        [1, -1]
      ]
    },
    series: [
      {
        name: 'Gaussian',
        type: 'heatmap',
        coordinateSystem: 'geo',
        minOpacity: 0.75,
        maxOpacity: 1,
        pointSize: 10,
        blurSize: 10,
      }, {
        type: 'custom',
        coordinateSystem: 'geo',
        renderItem: function (params: any, api: any) {
          console.log(params, api)
          const l = api.size([1, 1])[0] * params.coordSys.zoom * 0.7;
          const coord = api.coord([0, 0]);
          const fill = '#ffffff';
          return {
            type: 'group',
            x: coord[0],
            y: coord[1],
            children: [
              {
                type: 'line',
                style: {
                  stroke: '#ffffff50',
                  // stroke: '#252526',
                  lineWidth: 1
                },
                shape: {
                  x1: l,
                  y1: 0,
                  x2: -l,
                  y2: 0
                }
              },
              {
                type: 'line',
                style: {
                  // stroke: '#252526',
                  stroke: '#ffffff50',
                  lineWidth: 1
                },
                shape: {
                  x1: 0,
                  y1: l,
                  x2: 0,
                  y2: -l
                }
              },
              {
                type: 'group',
                x: 0,
                y: -45 - l,
                children: [
                  {
                    type: 'text',
                    style: {
                      text: 'Alert, Awake, Attentive',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'inter',
                      fill
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
                  }
                ]
              },
              {
                type: 'group',
                x: 0,
                y: 8 + l,
                children: [
                  {
                    type: 'text',
                    style: {
                      text: '',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'inter',
                      fill
                    }
                  },
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
                  }
                ]
              },
              {
                type: 'group',
                x: 54 + l,
                y: -18,
                children: [
                  {
                    type: 'text',
                    style: {
                      text: 'Emotion',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'inter',
                      fill
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
                  }
                ]
              },
              {
                type: 'group',
                x: -54 - l,
                y: -18,
                children: [
                  {
                    type: 'text',
                    style: {
                      text: 'Emotion',
                      fontSize: 18,
                      textAlign: 'center',
                      fontFamily: 'inter',
                      fill
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
                  }
                ]
              },
              {
                type: 'text',
                x: 48,
                y: -36,
                style: {
                  text: 'Indifference\nApathy',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              //第一象限
              {
                type: 'text',
                x: l - 56,
                y: 12 - l,
                style: {
                  text: 'Active Listening,\ndeep engagement',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              {
                type: 'text',
                x: l,
                y: -80,
                style: {
                  text: 'Camaraderie,\nAlignment',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              //第二象限
              {
                type: 'text',
                x: 108,
                y: 24,
                style: {
                  text: 'Collective\nInterest/Curiosity',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              {
                type: 'text',
                x: l,
                y: 80,
                style: {
                  text: 'Empathy',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              {
                type: 'text',
                x: l - 72,
                y: l - 24,
                style: {
                  text: 'Passive Listening,\nIntermittent\nattention',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              //第三象限
              {
                type: 'text',
                x: 12 - l,
                y: 60,
                style: {
                  text: 'No Cohesion',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              {
                type: 'text',
                x: 72 - l,
                y: l - 24,
                style: {
                  text: 'Bored Relations,\nChecked out',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              //第四象限
              {
                type: 'text',
                x: 56 - l,
                y: 12 - l,
                style: {
                  text: 'Antagonism,\nHostility',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
                }
              },
              {
                type: 'text',
                x: -l,
                y: -80,
                style: {
                  text: 'Negative Criticism,\nBlame',
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'inter',
                  fill
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
}