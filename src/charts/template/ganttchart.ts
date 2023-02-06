import { EChartsOption, graphic } from 'echarts'
import merge from "deepmerge";
export function GanttChart(data:any,type:string,legend:string[],colors:{[T:string]:string}, categories:string[], customOpt?:EChartsOption){
  // data.push(new Array(14*60).fill('').map((e,index)=>({
  //   Speaker:"T",
  //   Start:index*1000,
  //   End:(index+1)*1000,
  //   Emotion:"T",
  //   DialogueAct:"T"
  // })))
    const opt:EChartsOption = {
      tooltip: {
        show:false
      },
      dataZoom: [
        {
          type: 'slider',
          filterMode: 'weakFilter',
          showDataShadow: false,
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
        data: legend.map(k => {
          return {
            name: k,
            itemStyle: {
              color: colors[k]
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
      series: data.map((e:any) => {
        return {
          name: legend.includes(e[type]) ? e[type] : 'Others',
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
              {// 当前坐标系的包围盒。
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
                  fill: colors[e[type]]
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
          // data: [Object.values(e)]
          data: [[e.speaker,e.starts,e.ends,e.sentence,e.emotion,e.dialogue]]
        }
      })
    };
    return customOpt ? merge<EChartsOption>(opt,customOpt) as EChartsOption : opt;
}