import { EChartsOption } from "echarts";
export default async function(data:Promise<{k:string,v:number}[]>):Promise<EChartsOption>{
  return {
      radar: {
        // shape: 'circle',
        indicator:(await data).map(e=>{
          return {name:e.k,max:1}
        }),
        // [
        //   { name: 'Trust and\n Psychological\n Safety', max: 100 },
        //   { name: 'Task\nEngagement', max: 100 },
        //   { name: 'Shared Goal \nCommitment', max: 100 },
        //   { name: 'Enjoyment', max: 100 },
        //   { name: 'Equal \nParticipation', max: 100 },
        // ],
        axisName: {
          color: '#000',
        },
      },
      
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              // value: [46, 71, 23, 29, 62],
              value: (await data).map(e=>e.v),
              name: 'Allocated Budget',
              areaStyle: {
                color: 'rgba(255, 145, 124, 0.9)'
              }
            },
          ]
        }
      ]
    } as EChartsOption;
}