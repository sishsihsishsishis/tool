<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import * as echarts from 'echarts'
import { provide } from 'vue'

import heatmap from './charts/heatmap'
import valence_signal, { valence_signal_avg } from './charts/valence_signal'
import arousal_signal, { arousal_signal_avg } from './charts/arousal_signal'
import rppg_signal from './charts/rppg_signal'
import rppg_power from './charts/rppg_power'
import gantt from './charts/gantt'
import { brain, heart, behavior } from './charts/score'


import Star from './Star.vue'
import Echarts from './Echart.vue'
import { DateFormat } from "./utils";
import logo from './assets/Logo white.svg'

</script>

<template>
  <div class="top">
    <img src="./assets/Logo white.svg" class="logo" alt="logo" />
    <div class="toptext">
      <div>Section Start Time: {{ DateFormat(new Date(), 'yyyy E ddth HH:MM PP') }}</div>
      <div>Duration: {{ 58 }}min</div>
    </div>
  </div>
  <div class="con">
    <div class="overall-title">Overall Performance</div>
    <div class="overall-head">total score</div>
    <div class="overall-score">{{ 87 }}</div>
    <Star class="stars" :score="4" />

    <div class="overall-des">Great job! Your team meeting scores 87 out of 100.</div>
    <div class="thr">
      <Echarts class="echarts" :opt="brain" :height="300" :width="300" />
      <Echarts class="echarts" :opt="heart" :height="300" :width="300" />
      <Echarts class="echarts" :opt="behavior" :height="300" :width="300" />
    </div>
    
    <h3 style="color:#6B2524">
      <img class="ilogo" src="./assets/heart with bg.svg" />
      RPPG Signal Synchrony
    </h3>
    <h3>RPPG Signal</h3>
    <Echarts class="echarts" :opt="rppg_signal" style="width:100%; aspect-ratio: 3/1;" />
    <h3>RPPG Power</h3>
    <Echarts class="echarts" :opt="rppg_power" style="width:100%; aspect-ratio: 3/1;" />

    <div class="spline"></div>

    <h3 style="color:#6E974D">
     <img class="ilogo" src="./assets/hand with bg.svg" />
      Arousal Synchrony
    </h3>
    <Echarts class="echarts" :opt="arousal_signal_avg" style="width:100%; aspect-ratio: 3/1;" />
    <h3>Arousal signal</h3>
    <Echarts class="echarts" :opt="arousal_signal" style="width:100%; aspect-ratio: 3/1;" />

    <div class="spline"></div>

    <h3 style="color:#6E974D">Valence Synchrony</h3>
    <Echarts class="echarts" :opt="valence_signal_avg" style="width:100%; aspect-ratio: 3/1;" />
    <h3>Valence signal</h3>
    <Echarts class="echarts" :opt="valence_signal" style="width:100%; aspect-ratio: 3/1;" />

    <div class="spline"></div>

    <h3 style="color:#6E974D">
     <img class="ilogo" src="./assets/hand with bg.svg" />
      2D valence-arousal
    </h3>
    <Echarts class="echarts" :opt="heatmap" style="width:35em; aspect-ratio: 1/1;" />

    <div class="spline"></div>

    <h3>Speech overview</h3>
    <Echarts class="echarts" :opt="gantt" style="width:100%; aspect-ratio: 2/1;" />
  </div>

</template>

<style scoped>
.spline {
  width: 100%;
  border-bottom: solid 1px #dbdbdb;
}

.echarts {
  margin: 3em auto;
  page-break-inside: avoid
}

.top {
  height: 5em;
  width: 100vw;
  padding: 1.2em 1.5em;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  background-color: #D39D5E;
  color: white;
  position: sticky;
  top: 0px;
  z-index: 999;
}

.logo {
  height: 100%;
}

.ilogo{
  height: 1.2em;
  position: relative;
  bottom: -0.2em;
}
.toptext {
  font-size: 115%;
  height: 2em;
  margin: 0 1em;
}

.con {
  width: 75vw;
  padding: 1em;
  margin: auto;
}

.thr {
  width: 60em;
  display: flex;
  margin: auto;
}

.overall-title {
  font-size: 2em;
  font-weight: 600;
  color: #5E5F5C;
  text-align: left;
  margin: 1em 0;
}

.overall-head {
  font-size: 2em;
  font-weight: 600;
  color: #6A6A67;
}

.overall-score {
  margin: 0.5em 0;
  font-size: 4.5em;
  font-weight: 600;
  color: #000;
}

.overall-des {
  width: 14em;
  font-size: 1.8em;
  line-height: 1em;
  font-weight: 500;
  color: #6A6A67;
  margin: 1em auto;
}
h3{
  font-size: 125%;
  text-align: left;
  color: #A3A3A0;
}
</style>
