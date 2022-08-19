export default async function(){
  return {
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Trust and\n Psychological\n Safety', max: 100 },
          { name: 'Task\nEngagement', max: 100 },
          { name: 'Shared Goal \nCommitment', max: 100 },
          { name: 'Enjoyment', max: 100 },
          { name: 'Equal \nParticipation', max: 100 },
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
              value: [51, 48, 42, 20, 73],
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