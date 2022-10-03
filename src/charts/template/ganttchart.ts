import { EChartOption } from 'echarts'
import { graphic } from "echarts";
import merge from "deepmerge";
export function GanttChart(data:any, colors:{[T:string]:string}, categories:string[], customOpt?:EChartOption){
    const opt:EChartOption = {
      tooltip: {
        show:false
      },
      dataZoom: [
        {
          type: 'slider',
          filterMode: 'weakFilter',
          showDataShadow: 'false',
          top: 400,
          labelFormatter: '',
        },
        // {
        //   type: 'inside',
        //   filterMode: 'weakFilter'
        // }
      ],
      grid: {
        height: 300,
        left:120
      },
      legend: {
        data: Object.keys(data).map(e => {
          return {
            name: e,
            itemStyle: {
              color: colors[e]
            }
          }
        }),
      },
      xAxis: {
        type: 'time',
        scale: true,
      },
      yAxis: {
        data: categories,
      },
      series: Object.keys(data).map(c => {
        return {
          name: c,
          type: 'custom',
          renderItem: function (params:any, api:any) {
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
                style: {
                  fill: colors[c]
                }
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
          data: data[c]
        }
      })
    };
    return customOpt ? merge<EChartOption>(opt,customOpt) as EChartOption : opt;
}