export default async function(){
    return {
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Psychological\n Safety', max: 100 },
            { name: 'Absorption - Task\nEngagement', max: 100 },
            { name: 'Shared Goal \nCommitment', max: 100 },
            { name: 'Trust', max: 100 },
            { name: 'Enjoyment', max: 100 },
            { name: 'Collective \nAmbition', max: 100 },

            { name: 'Equal Participation', max: 100 },
          ],
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
                value: [30, 80, 90, 30, 80, 30, 80],
                name: 'Allocated Budget',
                areaStyle: {
                  color: 'rgba(255, 145, 124, 0.9)'
                }
              },
            ]
          }
        ]
      };
}