import { EChartsOption } from 'echarts'
import { emotionTypes, ActTypes } from './gantt'

function pie({ title, data }: { title: string, data: any[] }): EChartsOption {
  return {
    title: {
      text: title,
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
        radius: '60%',
        data,
        label: {
          formatter: '{b} \n {pre|{c} ({d}%)}',
          alignTo: 'labelLine',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            pre: {
              fontSize: 10,
              color: '#444'
            }
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  } as EChartsOption;
}

export const pieEmotions = async (pie_emotions: Promise<{ emotion: string, emotion_time: number }[]>): Promise<EChartsOption> => pie({
  title: 'Sentiment',
  data: (await pie_emotions).map(e => ({
    value: e.emotion_time,
    name: e.emotion,
    itemStyle: {
      color: emotionTypes[e.emotion]
    }
  }))
})


export const pieActs = async (pie_acts: Promise<{ act: string, act_time: number }[]>): Promise<EChartsOption> => pie({
  title: 'Language Use',
  data: (await pie_acts).map(e => ({
    value: e.act_time,
    name: e.act,
    itemStyle: {
      color: ActTypes[e.act]
    }
  }))
})

// [
//   { value: 2, name: 'Uninterpretable' },   // '#84584E',
//   { value: 137, name: 'Statement-opinion' },   // '#8E69B8',
//   { value: 490, name: 'Statement-non-opinion' },   // '#C53932',
//   { value: 7, name: 'Yes-No-Question' },   // '#D57DBE',
//   { value: 19, name: 'Collaborative Completion' },  // '#EF8636',
//   { value: 22, name: 'Abandoned or Turn-Exit' },  // '#3B75AF',
//   { value: 63, name: 'Others' },  // '#529E3E',
// ],
import userColor from './template/color'

export const pieSpeakers = async (pie_speakers: Promise<{ speaker: string, speaker_time: number }[]>): Promise<EChartsOption> => pie({
  title: 'Speaker Time',
  data: (await pie_speakers).map(e => ({
    value: e.speaker_time,
    name: e.speaker,
    itemStyle: {
      color: userColor[e.speaker]
    }
  }))
})

function mulBar({ title, data, color }: { title: string, data: {[key:string]:{[ket:string]:number}} ,color:{[key:string]:string}}): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
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
      data: Object.keys(data[Object.keys(data)[0]])
    },
    series: Object.keys(data).map(e=>(
      {
        name: e,
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        itemStyle: { color: color[e] },
        data: Object.values(data[e])
      })),
  }
}

export const stackedBarEmotions = async (stacked_bar_emotions:Promise<{[key:string]:{[ket:string]:number}}>): Promise<EChartsOption> => {
  return mulBar({
    title:'',
    color: emotionTypes,
    data: await stacked_bar_emotions
  })
}

export const stackedBarSpeakers = async (stacked_bar_speakers:Promise<{[key:string]:{[ket:string]:number}}>): Promise<EChartsOption> => mulBar({
  title:'',
  color: userColor,
  data: await stacked_bar_speakers
})

