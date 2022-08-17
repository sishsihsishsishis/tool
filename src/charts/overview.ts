export default  {
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Highest',
        type: 'line',
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
      },
      {
        name: 'Lowest',
        type: 'line',
        data: [1, 2, 2, 5, 3, 2, 6],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
      }
    ]
  };