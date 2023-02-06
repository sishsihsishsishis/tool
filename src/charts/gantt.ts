import { GanttChart } from "./template/ganttchart";

// let categories = Object.keys(speakers).sort().reverse();
// const per: { [T: string]: string } = speakers


export let emotionTypes: {
  [T: string]: string
} = {
  'Neutral': '#F1975D',//'#FF7410'
  'Positive': '#70A861',//'#2B9529'
  'Negative': '#6088B6',//'#226BA9'
}



export default async function ({ speakers,Emotion,data }:{speakers:Promise<{ [T: string]: string }>,Emotion:Promise<any>,data:Promise<any>}) {
  // let { speakers,Emotion,DialogueAct,data }  = (await axios.get(`/csv/nlp?meetingID=${meetingId}`)).data.data
  let pie = await speakers;
  return GanttChart(await data,'emotion',await Emotion,emotionTypes, Object.keys(await speakers).sort().reverse(), {
    yAxis: {
      axisLabel: {
        formatter: (y: string) => `${y} (${pie[y]}%)`
      }
    },
  })
}

export let ActTypes: {
  [T: string]: string
} = {
  'Uninterpretable': '#84584E',
  'Statement-opinion': '#8E69B8',
  'Statement-non-opinion': '#C53932',
  'Yes-No-Question': '#D57DBE',
  'Declarative Yes-No-Question': '#a0aDBE',
  'Collaborative Completion': '#EF8636',
  'Abandoned or Turn-Exit': '#3B75AF',
  'Action-directive': '#b28636',
  'Repeat-phrase': '#b286e6',
  'Appreciation': '#b2e6e6',
  'Hold before answer/agreement': '#22e6e6',
  'Agree/Accept': '#2200e6',
  'Conventional-closing': '#aa00e6',
  'Response Acknowledgement': '#ea00e6',
  'Rhetorical-Questions': '#98a60a',
  'Wh-Question': '#eba60a',
  'Others': '#529E3E',
}

export const dialog = async function ({ speakers,DialogueAct,data }:{speakers:Promise<{ [T: string]: string }>,DialogueAct:Promise<any>,data:Promise<any>}) {
  // let { speakers,Emotion,DialogueAct,data }  = (await axios.get(`/csv/nlp?meetingID=${meetingId}`)).data.data
  let pie = await speakers;
  return GanttChart(await data,'dialogue',await DialogueAct, ActTypes, Object.keys(await speakers).sort().reverse(), {
    legend: {
      left: '10%',
      right: '10%'
    },
    yAxis: {
      axisLabel: {
        formatter: (y: string) => `${y} (${pie[y]}%)`
      }
    },
  })
}