import { types2 } from './gantt'
import { types } from './gantt'

export let p1 = async function () {
  return {
    title: {
      text: 'Sentiment',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
      orient: 'vertical',
      left: 'left'
    },
    color: Object.values(types),
    series: [
      {
        type: 'pie',
        radius: '70%',
        data: [
          { value: 1466, name: 'Neutral' },
          { value: 141, name: 'Positive' },
          { value: 555, name: 'Negative' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}


export let p2 = async function () {
  return {
    title: {
      text: 'Language Use',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
      orient: 'vertical',
      left: 'left'
    },
    color: Object.values(types2),
    series: [
      {
        type: 'pie',
        radius: '75%',
        data: [
          { value: 1, name: 'Uninterpretable' },   // '#84584E',
          { value: 720, name: 'Statement-opinion' },   // '#8E69B8',
          { value: 1127, name: 'Statement-non-opinion' },   // '#C53932',
          { value: 95, name: 'Yes-No-Question' },   // '#D57DBE',
          { value: 60, name: 'Collaborative Completion' },  // '#EF8636',
          { value: 75, name: 'Abandoned or Turn-Exit' },  // '#3B75AF',
          { value: 84, name: 'Others' },  // '#529E3E',
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}

import color from './template/color'
export let u1 = async function () {
  return {
    title: {
      text: 'User',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '75%',
        data: [
          { value: 525, name: 'User00', itemStyle: { color: color['User00'] } },
          { value: 1156, name: 'User01', itemStyle: { color: color['User01'] } },
          { value: 133, name: 'User02', itemStyle: { color: color['User02'] } },
          { value: 67, name: 'User10', itemStyle: { color: color['User10'] } },
          { value: 151, name: 'User11', itemStyle: { color: color['User11'] } },
          { value: 130, name: 'User12', itemStyle: { color: color['User12'] } },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}

export let u2 = async function () {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   containLabel: true
    // },
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['User00', 'User01', 'User02', 'User10', 'User11', 'User12']
    },
    series: [
      {
        name: 'Negative',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: types.Negative },
        data: [90, 307, 43, 53, 24, 38]
      },
      {
        name: 'Neutral',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: types.Neutral },
        data: [423, 724, 89, 14, 125, 92]
      },
      {
        name: 'Positive',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: types.Positive },
        data: [12, 126, 1, 0, 2, 0]
      },
    ]
  };
}


let da:{[key:string]:number[]} = {
  'User00':[ 90,423,12],
  'User01':[307,724,126],
  'User02':[ 43,89,1],
  'User10':[ 53,14,0],
  'User11':[ 24,125,2],
  'User12':[ 38,92,0]
}

export let u3 = async function () {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    // grid: {
    //   left: '3%',
    //   right: '4%',
    //   bottom: '3%',
    //   containLabel: true
    // },
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['Negative', 'Neutral', 'Positive']
    },
    series: Object.keys(da).map(k=>{
      return {
        name: k,
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: color[k] },
        data: da[k]
      }
    })
  };
}