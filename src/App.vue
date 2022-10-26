<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { DateFormat } from "./utils";
import { startDate } from "./charts/template/time"
import Video from './Video.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import Vchart from "./Vchart.vue";
import valence_signal, { valence_signal_syn } from './charts/valence_signal'
import arousal_signal, { arousal_signal_syn } from './charts/arousal_signal'
import rppg_signal from './charts/rppg_signal'
import rppg_power, { rppg_sync } from './charts/rppg_power'
import e from './charts/template/ellipse.echarts'
import gantt, { dialog, types, types2 } from './charts/gantt'
import { brain, heart, behavior } from './charts/score'
import Echarts from './Echart.vue'
import raddar from './charts/raddar'
import heatmap from './charts/heatmap'
import colors from './charts/template/color'

import { getEmitter } from "./mitt";
import tiplist from './tips.json'
import marks from '../data/do/marks/user_marks.json'
import { StructuralDirectiveTransform } from "@vue/compiler-core";
const tips = reactive(marks);

let userSelected = ref('')
type s  = "10" | "11" | "12" | "team" | "00" | "01" | "02" ;
function getValueFromKey<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let c:s = "00"
let um = computed<any>(()=>userSelected.value.replace('User',''))
let t1 = computed<any>(()=>userSelected.value?getValueFromKey(tiplist,getValueFromKey(marks,um.value)[0].label.toString()):'')
let t2 = computed(()=>userSelected.value?tiplist[marks[um.value][1].label.toString()]:'')
let t3 = computed(()=>userSelected.value?tiplist[marks[um.value][2].label.toString()]:'')

let users = ['User00','User01','User02','User10','User11','User12']
function select(user:string){
  if(userSelected.value == user) {
    userSelected.value = '';
    getEmitter().emit('legendAllSelect',``)
  }
  else {
    getEmitter().emit('legendAllSelect',``)
    getEmitter().emit('legendUnSelect',users.filter(e=>e.indexOf(user)<0))
    userSelected.value = user;
  }
}
function jumpTo(time:number) {
  getEmitter().emit('video_time_update',time)
  getEmitter().emit('chart_time_update',time)
}
</script>

<template>
  <div class="top">
      <div style="display: flex;">
      <img src="./assets/Logo-white.svg" class="logo" alt="logo" />
        <strong>Syneurgy Team Performance Report</strong></div>
        <div class="scores">
          <span class="scores_text">Total Score: {{ 63 }}</span> &nbsp;|&nbsp;
          <img class="logo1"  src="./assets/brain-white.svg" />
          <Echarts class="inline-echarts" :opt="brain" :height="58" :width="58" />
          <img class="logo1"  src="./assets/heart-white.svg" />
          <Echarts class="inline-echarts" :opt="heart" :height="58" :width="58" />
          <img class="logo1"  src="./assets/hand-white.svg" />
          <Echarts class="inline-echarts" :opt="behavior" :height="58" :width="58" />
        </div>
      <div>Section Start Time: {{ DateFormat(startDate, 'yyyy E ddth HH:MM PP') }} | Duration: {{
          50
      }}min</div>
  </div>
  <div class="con">
    <div class="tc">
      <div class="left">
        <!-- <img src="./assets/team_members.jpg" alt="" style="margin-top:0em;width: 400px;"> -->
        <Video></Video>
        <div class="left-echarts">
          <div style="height: 2000px; padding-top: 1em;">
          <div class="tips">
            <div class="tip" :class="{ltip:t1.length>20}" :style="{borderColor:colors[um]}"><span class="secjump" @click="jumpTo(marks[um][0].start)">section 1 :</span> {{t1}}</div>
            <div class="tip" :class="{ltip:t2.length>20}" :style="{borderColor:colors[um]}"><span class="secjump" @click="jumpTo(marks[um][1].start)">section 2 :</span> {{t2}}</div>
            <div class="tip" :class="{ltip:t3.length>20}" :style="{borderColor:colors[um]}"><span class="secjump" @click="jumpTo(marks[um][2].start)">section 3 :</span> {{t3}}</div>
          </div>
          <Echarts class="echarts" :opt="raddar"  style="width:600px; height: 600px;" />
          <Echarts class="echarts" :opt="heatmap" style="width:600px; height: 600px;" />
        </div>
      </div>
      </div>
    
      <div class="vcharts">
        <div class="right-top">
          <div class="avatar" :class="{unselected:userSelected!='00'}" :style="{backgroundColor:colors['00']}" @click="select('00')"><img src="./assets/user00.jpg"><span :class="{selected:userSelected=='00'}" :style="{color:colors['00']}">User00</span></div>
          <div class="avatar" :class="{unselected:userSelected!='01'}" :style="{backgroundColor:colors['01']}" @click="select('01')"><img src="./assets/user01.jpg"><span :class="{selected:userSelected=='01'}" :style="{color:colors['01']}">User01</span></div>
          <div class="avatar" :class="{unselected:userSelected!='02'}" :style="{backgroundColor:colors['02']}" @click="select('02')"><img src="./assets/user02.jpg"><span :class="{selected:userSelected=='02'}" :style="{color:colors['02']}">User02</span></div>
          <div class="avatar" :class="{unselected:userSelected!='10'}" :style="{backgroundColor:colors['10']}" @click="select('10')"><img src="./assets/user10.jpg"><span :class="{selected:userSelected=='10'}" :style="{color:colors['10']}">User10</span></div>
          <div class="avatar" :class="{unselected:userSelected!='11'}" :style="{backgroundColor:colors['11']}" @click="select('11')"><img src="./assets/user11.jpg"><span :class="{selected:userSelected=='11'}" :style="{color:colors['11']}">User11</span></div>
          <div class="avatar" :class="{unselected:userSelected!='12'}" :style="{backgroundColor:colors['12']}" @click="select('12')"><img src="./assets/user12.jpg"><span :class="{selected:userSelected=='12'}" :style="{color:colors['12']}">User12</span></div>
        </div>
        Heart Synchrony
        <Vchart :opt="rppg_sync" :height="300" :width="900" />
        Heart Signal
        <Vchart :opt="rppg_signal" :height="300" :width="900" />
        


        
        Emotional Synchrony (Positive or Negative)
        <Vchart :opt="valence_signal_syn" :height="300" :width="900" />
        Emotional Signal (Positive or Negative)
        <Vchart :opt="valence_signal" :height="300" :width="900" />
        Attentiveness Synchrony
        <Vchart :opt="arousal_signal_syn" :height="300" :width="900" />
        Attentiveness Signal
        <Vchart :opt="arousal_signal" :height="300" :width="900" />

        <Vchart :opt="e" :height="700" :width="900" :type="'ellipse'"/>
        
        Sentiment Overview
        <Vchart :opt="gantt" :height="500" :width="900" :type="'gantt'" />
        Language Use Overview
        <Vchart :opt="dialog" :height="500" :width="900" :type="'gantt'"/>

      </div>
    </div>
  </div>

</template>

<style scoped>
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
.logo1{
  height: 1.5em;
  margin: 1em 0.25em;
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
  width: calc(100vw - 500px - 2em);
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

.avatar span.selected{
  color: #ffffff!important
}
.avatar.unselected{
  border: solid 1px #ffffff20;
  background-color: #CB9F6800!important;
}

.avatar img{
  width: 3em;
  border-radius: 50%;
  border: solid 1px #00000040;
  overflow: hidden;
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
