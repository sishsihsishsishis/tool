<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Vchart from "./Vchart.vue";
import valence_signal, { valence_signal_syn } from './charts/valence_signal'
import arousal_signal, { arousal_signal_syn } from './charts/arousal_signal'
import rppg_signal from './charts/rppg_signal'
import rppg_power, { rppg_sync } from './charts/rppg_power'
import gantt, { dialog, types, types2 } from './charts/gantt'
import { brain, heart, behavior } from './charts/score'
import Echarts from './Echart.vue'
import raddar from './charts/raddar'
import heatmap from './charts/heatmap'
import colors from './charts/template/color'

import { getEmitter } from "./mitt";
let video = ref<HTMLVideoElement>();

onMounted(async () => {
  let last = 0
  video.value!.ontimeupdate = (event: any) => {
    let now = Math.floor(video.value!.currentTime)
    if (now != last) {
      // console.log(now)
      last = now
      getEmitter().emit('video_time_update', now)
    }
  }
})
getEmitter().on('chart_time_update', async (i: number) => {
  let done;
  if (video.value!.paused) {
    video.value!.currentTime = i
  }
  else {
    await done;
    video.value!.pause()
    video.value!.currentTime = i
    done = video.value!.play()
  }
})

</script>

<template>
  <div class="tc">
    <div class="left">
      <!-- <img src="./assets/team_members.jpg" alt="" style="margin-top:0em;width: 400px;"> -->

      <video ref="video" id="video" height="270" width="500" controls="true">
        <source src="./assets/demo.mp4" type="video/mp4">
      </video>
      <div class="thr">
        <Echarts class="echarts" :opt="brain" :height="300" :width="300" />
        <Echarts class="echarts" :opt="heart" :height="300" :width="300" />
        <Echarts class="echarts" :opt="behavior" :height="300" :width="300" />
      </div>
      <div class="ra">
    <Echarts class="echarts" :opt="raddar" style="width:40em; aspect-ratio: 1/1;" />
    <Echarts class="echarts" :opt="heatmap" style="width:40em; aspect-ratio: 1.2/1;" />

      </div>
    </div>
   
    <div class="vcharts">
      <div class="right-top">
      <div class="avatar"><img src="./assets/user00.jpg"><span :style="{color:colors['00']}">User00</span></div>
      <div class="avatar"><img src="./assets/user01.jpg"><span :style="{color:colors['01']}">User01</span></div>
      <div class="avatar"><img src="./assets/user02.jpg"><span :style="{color:colors['02']}">User02</span></div>
      <div class="avatar"><img src="./assets/user10.jpg"><span :style="{color:colors['10']}">User10</span></div>
      <div class="avatar"><img src="./assets/user11.jpg"><span :style="{color:colors['11']}">User11</span></div>
      <div class="avatar"><img src="./assets/user12.jpg"><span :style="{color:colors['12']}">User12</span></div>
    </div>
      Heart Synchrony
      <Vchart :opt="rppg_sync" :height="300" :width="950" />
      Heart Signal
      <Vchart :opt="rppg_signal" :height="300" :width="950" />
      


      
      Emotional Synchrony (Positive or Negative)
      <Vchart :opt="valence_signal_syn" :height="300" :width="950" />
      Emotional Signal (Positive or Negative)
      <Vchart :opt="valence_signal" :height="300" :width="950" />
      Attentiveness Synchrony
      <Vchart :opt="arousal_signal_syn" :height="300" :width="950" />
      Attentiveness Signal
      <Vchart :opt="arousal_signal" :height="300" :width="950" />


      
      Sentiment Overview
      <Vchart :opt="gantt" :height="500" :width="950" :type="'gantt'" />
      Language Use Overview
      <Vchart :opt="dialog" :height="500" :width="950" :type="'gantt'"/>

    </div>
  </div>
</template>

<style scoped>
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
  padding: 3em 1em 0 1em;
  background-color: #ffffff;
  /* border-right: solid 1px #d8d8d8; */
  box-shadow: 5px 4px 10px 0 #00000010;
  z-index: 100;
  height: 100%;
}
.right-top {
  width: calc(100vw - 500px - 2em);
  background-color: #ffffff;
  position: fixed;
  display: block;
  top: 2.4em;
  right: 0;
  z-index: 99;
  padding: 0.5em 2em;
  /* margin-left: 1em; */
  box-sizing: border-box;
  /* border-bottom: solid 1px #d8d8d8; */
  box-shadow: 5px 4px 10px 0 #00000010;
  display: flex;
  justify-content: space-around;
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
}
.avatar img{
  width: 3em;
  border-radius: 50%;
  overflow: hidden;
}

.avatar span{
  margin: auto 1em;
  font-weight: bold;
}

.vcharts {
  margin-left: 600px;
  margin-top: 7em;
}


.ff {
  width: 1em;
  height: 1em;
  display: inline-block;
  margin: 0 0.5em;
  position: relative;
  bottom: -0.2em;
}

.thr {
  width: 1000px;
  display: flex;
  margin: auto;
  zoom: 0.4;
}
.ra {
  display: flex;
  /* width: 1200px; */
  margin: auto;
  zoom: 0.4;
}
</style>
