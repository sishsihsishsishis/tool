<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { DateFormat } from "./utils";
import { ref, onMounted, reactive, computed, toRefs, provide, watchEffect } from 'vue'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from "vue-router";
import Vchart from "./Vchart.vue";
import Video from './Video.vue'
import valence_signal, { valence_signal_syn } from './charts/valence_signal'
import arousal_signal, { arousal_signal_syn } from './charts/arousal_signal'
import { rppg_signal, rppg_sync } from './charts/rppg'
import e from './charts/template/ellipse.echarts'
import gantt, { dialog, emotionTypes, ActTypes } from './charts/gantt'
import Echarts from './Echart.vue'
import Ring from './Ring.vue'
import raddar from './charts/raddar'
import heatMap from './charts/heatmap'
import { pieEmotions, pieActs, pieSpeakers ,stackedBarEmotions, stackedBarSpeakers} from './charts/pie'
import colors from './charts/template/color'

import { getEmitter } from "./mitt";
import tips from './tips.json'
import { 
  meetingStartTime as meetingStartTimeD,
  userAvatar as userAvatarD
} from '../data/raw/json_outputs.json'
import { tb } from "./charts/threebody";
import ra from "./charts/ra";
let baseurl = import.meta.env.VITE_API_URL

const props = defineProps({meetingid:{type:String,default:'0'}})
const router = useRouter();

let meetingStartTime = ref<Date>(new Date())
let meetingStartTimeString = computed(()=>{
  return DateFormat(meetingStartTime.value!, 'yyyy E ddth HH:MM')
})
provide('startTime', meetingStartTime)
let drawer = ref(false)
let videoCache = ref<boolean>(false)
let Duration = ref<number>(0)

let {stacked_bar_emotions, stacked_bar_speakers} = fetchDepath(axios.get(`/csv/bar?meetingID=${props.meetingid}`),['stacked_bar_emotions','stacked_bar_speakers'])

let {speakers, Emotion, DialogueAct, data: nlpData} = fetchDepath(axios.get(`/csv/nlp?meetingID=${props.meetingid}`),['speakers','Emotion','DialogueAct','data'])
let gantt_data = { speakers, Emotion, data: nlpData }
let dialog_data = { speakers, DialogueAct, data: nlpData }

let {pie_acts,pie_emotions,pie_speakers} = fetchDepath(axios.get(`/csv/pie?meetingID=${props.meetingid}`),['pie_acts','pie_emotions','pie_speakers'])
let {heatmap} = fetchDepath(axios.get(`/csv/heatmap?meetingID=${props.meetingid}`),['heatmap'])

let {radar} = fetchDepath(axios.get(`/csv/radar?meetingID=${props.meetingid}`),['radar'])

let individualr = fetchDepath(axios.get(`/csv/individualr/${props.meetingid}`),['time','distance','rate','individual_sync_value'])
let individuala = fetchDepath(axios.get(`/csv/individuala/${props.meetingid}`),['time','distance','rate','individual_sync_value'])
let individualv = fetchDepath(axios.get(`/csv/individualv/${props.meetingid}`),['time','distance','rate','individual_sync_value'])


let sections = axios.get(`/csv/section?meetingID=${props.meetingid}`).then(res=>{return {team:res.data.data.team,...res.data.data.user}})

// let c1 = axios.get(`/csv/bar?meetingID=${meetingId}`).then(res=>{
//   let { stacked_bar_emotions, stacked_bar_speakers } = res.data.data
//   stacked_bar_emotions_resolve(stacked_bar_emotions);
//   stacked_bar_emotions_resolve(stacked_bar_speakers);
//   }
// })
let scores = toRefs(reactive({
  brain:null,
  body:47,
  behavior:50,
  total:50
}))
let userAvatar = ref<{[key :string]:string}>()
let users = computed(()=>Object.keys(userAvatar.value??{}).sort())
onMounted(async ()=>{
  let {duration,body_score,behavior_score,total_score,meetingStartTime:meeting_start_time } = (await axios.get(`/csv/score?meetingID=${props.meetingid}`)).data.data
  scores.body.value = body_score
  scores.behavior.value = behavior_score
  scores.total.value = total_score
  marks.value = await sections
  Duration.value = duration
  meetingStartTime.value = new Date(meeting_start_time)
  let {userAvatar:user_avatar} = (await axios.get(`/meeting/avatar/${props.meetingid}`)).data.data
  userAvatar.value = user_avatar
})
let userSelected = ref<string>('')
let marks = ref<{ [key: string]: { start: number, end: number, label?: number }[] }>({"team": [{"start": 0,"end": 0},],})
let userTip = computed<any>(()=>userSelected.value?marks.value[userSelected.value].map(e=>tips[e.label!.toString() as keyof typeof tips]):marks.value['team'].map(e=>''))

function select(user:string){
  if(userSelected.value == user) {
    userSelected.value = '';
    getEmitter().emit('legendAllSelect',``)
  }
  else {
    getEmitter().emit('legendAllSelect',``)
    getEmitter().emit('legendUnSelect',users.value.filter(e=>e.indexOf(user)<0))
    userSelected.value = user;
  }
}
function jumpTo(time:number) {
  getEmitter().emit('video_time_update',time/1000)
  getEmitter().emit('chart_time_update',time/1000)
}

function getAssetsUrl(u:string) {
    return new URL(`/data/assets/${u}`, import.meta.url).href;
}

function fetchDepath(api:Promise<AxiosResponse>,keys:string[]):{[key :string]:Promise<any>}{
  let resData:any;
  api.then(res=>{
    resData = res.data.data
  })
  return keys.reduce((pre:{[key :string]:Promise<any>},key)=>{
    pre[key] = new Promise(async resolve=>{
      await api;
      resolve(resData[key])
    })
    return pre;
  },{})
}
</script>

<template>
  <el-drawer v-model="drawer" title="Settings" :size="'25%'" :append-to-body="true" :with-header="true">
    <span>VideoCache : </span>
    <el-switch v-model="videoCache" inline-prompt
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    active-text="Y"
    inactive-text="N" />
    <div>
      <div>Section Start Time:
      <el-date-picker
        v-model="meetingStartTime"
        type="datetime"
        placeholder="meeting start time"
      /></div>

    </div>
    
  </el-drawer>
  <div class="top">
      <div style="display: flex;">
      <img src="./assets/Logo-white.svg" class="logo" alt="logo" @click="router.push('/home')" />
        <strong>Syneurgy Team Performance Report</strong></div>
        <div class="scores">
          <span class="scores_text">Total Score: {{ scores.total }}</span> &nbsp;|&nbsp;
          <img class="logo1"  src="./assets/brain-white.svg" />
          <Ring class="inline-echarts" :value="scores.brain" color="#C79459" :height="58" :width="58" />
          <img class="logo1"  src="./assets/heart-white.svg" />
          <Ring class="inline-echarts" :value="scores.body" color="#B73B4B" :height="58" :width="58" />
          <img class="logo1"  src="./assets/hand-white.svg" />
          <Ring class="inline-echarts" :value="scores.behavior" color="#9FC949" :height="58" :width="58" />
        </div>
      <div>Section Start Time: {{ meetingStartTimeString }} |
          Duration: {{ (Duration /(60 * 1000)).toFixed(0) }}min</div>
      <img class="logom"  src="./assets/more.svg" @click="drawer = true" />

  </div>
  <div class="con">
    <div class="tc">
      <div class="left">
        <!-- <img src="./assets/team_members.jpg" alt="" style="margin-top:0em;width: 400px;"> -->
        <!-- <Video :file="getAssetsUrl(meetingid!)"></Video> -->
        <Video :file="`/s3/video?meetingID=${meetingid!}`" :cache="videoCache" :key="videoCache+''"></Video>
        <div class="left-echarts">
          <div style="height: 5000px; padding-top: 1em;">
            <div class="tips">
              <div class="tip" v-for="i in marks['team'].length" :key="i" :class="{ltip:userTip[i-1].length>20}" :style="{borderColor:colors[userSelected]}"><span class="secjump" @click="jumpTo(marks[userSelected][i-1].start)">section {{ i }} :</span> {{userTip[i-1]}}</div>
            </div>
            <Echarts class="echarts" :opt="raddar(radar)"  style="width:600px; height: 600px;" />
            <Echarts class="echarts" :opt="heatMap(heatmap)" style="width:600px; height: 600px;" />
            <Echarts class="echarts" :opt="pieEmotions(pie_emotions)" style="width:600px; height: 600px;" />
            <Echarts class="echarts" :opt="pieActs(pie_acts)" style="width:600px; height: 600px;" />
            <Echarts class="echarts" :opt="pieSpeakers(pie_speakers)" style="width:600px; height: 600px;" />
            <Echarts class="echarts" :opt="stackedBarEmotions(stacked_bar_emotions)" style="width:600px; height: 600px;" />
            <Echarts class="echarts" :opt="stackedBarSpeakers(stacked_bar_speakers)" style="width:600px; height: 600px;" />
          </div>
        </div>
      </div>

      <div class="vcharts">
        <div class="right-top">
          <div v-for="u in users" :key="u" class="avatar" :class="{unselected:userSelected!=u,more:users.length >= 6}" :style="{backgroundColor:colors[u]}" @click="select(u)"><img :src="`${baseurl}/meeting/img/${meetingid}/${userAvatar[u as keyof typeof userAvatar]}`" onerror="this.classList.add('error');"><span :class="{selected:userSelected==u}" :style="{color:colors[u]}">{{u}}</span></div>
        </div>
        Heart Individual Synchrony
        <Vchart :opt="tb(individualr)" :height="400" :width="900" />

        Heart Synchrony
        <Vchart :opt="rppg_sync(meetingid,sections)" :height="300" :width="900" />
        Heart Signal
        <Vchart :opt="rppg_signal(meetingid,sections)" :height="300" :width="900" />
        
        Emotional Individual Synchrony
        <Vchart :opt="tb(individualv)" :height="400" :width="900" />
        Emotional Synchrony (Positive or Negative)
        <Vchart :opt="valence_signal_syn(meetingid,sections)" :height="300" :width="900" />
        Emotional Signal (Positive or Negative)
        <Vchart :opt="valence_signal(meetingid,sections)" :height="300" :width="900" />
        Attentiveness Individual Synchrony
        <Vchart :opt="tb(individuala)" :height="400" :width="900" />
        Attentiveness Synchrony
        <Vchart :opt="arousal_signal_syn(meetingid,sections)" :height="300" :width="900" />
        Attentiveness Signal
        <Vchart :opt="arousal_signal(meetingid,sections)" :height="300" :width="900" />
        
        <Vchart :opt="ra(individuala)" :height="700" :width="900" :type="'ellipse'"/>

        <Vchart :opt="e(meetingid)" :height="700" :width="900" :type="'ellipse'"/>
        
        Sentiment Overview
        <Vchart :opt="gantt(gantt_data)" :height="500" :width="900" :type="'gantt'" />
        Language Use Overview
        <Vchart :opt="dialog(dialog_data)" :height="500" :width="900" :type="'gantt'"/>

      </div>
    </div>
  </div>

</template>

<style scoped>
span, strong{
  white-space:nowrap;
}
.spline {
  width: 100%;
  border-bottom: solid 1px #dbdbdb;
}

.echarts {
  margin: 0 auto;
  page-break-inside: avoid
}
.inline-echarts{
  margin: 0;
}

.top {
  /* font-size: 28px; */
  height: 4em;
  line-height: 3.5em;
  width: 100vw;
  padding: 0.25em 1.5em;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  justify-content: space-between;
  background-color: #D39D5E;
  color: white;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.logo {
  height: 2em;
  margin: 0.75em 1em 0.75em 0;
}
.logo:hover{
  cursor: pointer;
}
.logo1{
  height: 1.5em;
  margin: 1em 0.25em;
}
.logom{
  height: 1.5em;
  margin: 1em -0.25em 1em 1em;
}
.logom:hover{
  cursor: pointer;
  background-color: #00000012;
  border-radius: 50%;
}
.scores_text {
  font-size: 1.35em;
  font-weight: 500;
}

.scores {
  /* width: 60em; */
  display: flex;
  margin: auto;
}


.tc {
  display: flex;
  width: 100%;
  /* height: 100vh; */
  justify-content: center;
}

.left {
  width: 500px;
  position: fixed;
  display: block;
  left: 0em;
  padding: 5em 1em 0 1em;
  background-color: #ffffff;
  /* border-right: solid 1px #d8d8d8; */
  box-shadow: 5px 4px 10px 0 #00000010;
  z-index: 100;
  height: 100%;
}

.tips {
  text-align: left;
}
.tip{
  height: 3em;
  padding-left: 1em;
  margin: 0.75em 0;
  border-left: solid 0.5em #CB9F68;
  transition: all ease 0.3s;
}
.tip.ltip{
  height: 6em!important;
}

.right-top {
  width: calc(100vw - 500px);
  min-height: 4.2em;
  background-color: #ffffff;
  position: fixed;
  display: block;
  top: 4em;
  right: 0;
  z-index: 99;
  padding: 0.5em 2em;
  /* margin-left: 1em; */
  box-sizing: border-box;
  /* border-bottom: solid 1px #d8d8d8; */
  box-shadow: 5px 4px 10px 0 #00000010;
  display: flex;
  justify-content: space-around;
  gap: 0.3em;
}
.score{
  font-size: 150%;
  font-weight: 400;
  /* margin: 0.2em 0; */
  padding: 0.3em;
  /* border-top: solid 1px #d8d8d8;
  border-bottom: solid 1px #d8d8d8; */
}

.avatar{
  display: flex;
  border: solid 1px #00000000;
  border-radius: 1.5em;
  cursor: pointer;
}

.avatar.more{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.2em;
  border-radius: 1em;
}
.avatar span.selected{
  color: #ffffff!important
}
.avatar.unselected{
  border: solid 1px #ffffff20;
  background-color: #CB9F6800!important;
}

.avatar img{
  width: 3em;
  height: 3em;
  border-radius: 50%;
  border: solid 1px #00000040;
  overflow: hidden;
}
img.error {
  display: inline-block;
  transform: scale(1);
  content: '';
  color: transparent;
}

/* // 图片显示错误： 显示缺省图片 */
img.error::before {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  background: #e1e1e1 url(break.svg) no-repeat center / 50% 50%;
}

.avatar span{
  margin: auto 1em;
  font-weight: bold;
  user-select:none;
}

.vcharts {
  margin-left: calc(500px);
  margin-top: 9em;
}


.ff {
  width: 1em;
  height: 1em;
  display: inline-block;
  margin: 0 0.5em;
  position: relative;
  bottom: -0.2em;
}

.left-echarts {
  /* display: flex; */
  /* width: 1200px; */
  height: 100%;
  margin: auto;
  zoom: 0.75;
  /* transform: scale(0.75); */
  overflow: scroll;
}
.secjump{
  background-color: #00000012;
  border-radius: 0.3em;
  padding: 0.15em 0.5em;
}
.secjump:hover{
  background-color: #00000032;
  transition: all ease 0.3s;
  cursor: pointer;
}
</style>
