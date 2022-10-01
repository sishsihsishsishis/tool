<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import * as echarts from 'echarts'
import { provide } from 'vue'

import heatmap from './charts/heatmap'
import valence_signal, { valence_signal_syn } from './charts/valence_signal'
import arousal_signal, { arousal_signal_syn } from './charts/arousal_signal'
import rppg_signal from './charts/rppg_signal'
import rppg_power, { rppg_sync } from './charts/rppg_power'
import gantt, { dialog, types, types2 } from './charts/gantt'
import { brain, heart, behavior } from './charts/score'
import raddar from './charts/raddar'
import ov from './charts/overview'


import Star from './Star.vue'
import Echarts from './Echart.vue'
import Video from './Video.vue'
import { DateFormat } from "./utils";
import { startDate } from "./charts/template/time"
</script>

<template>
  <div class="top">
      <div style="display: flex;">
    <img src="./assets/Logo-white.svg" class="logo" alt="logo" />
        <strong>Syneurgy Team Performance Report</strong></div>
        <span>Total Score: <strong>{{ 63 }}</strong></span>
      <div>Section Start Time: {{ DateFormat(startDate, 'yyyy E ddth HH:MM PP') }} | Duration: {{
          50
      }}min</div>
  </div>
  <div class="con">
    <Video></Video>
</div>
<div style="display: none">
    <!-- <img src="./assets/team_members.jpg" alt="" style="margin-top:2em"> -->
    <div class="overall-title">Overall Performance</div>
    <div class="overall-head">total score</div>
    <div class="overall-score">{{ 63 }}</div>
    <!-- <Star class="stars" :score="4" /> -->

    <div class="overall-des">Cool! Your team meeting scores 63 out of 100.</div>
    <div class="thr">
      <Echarts class="echarts" :opt="brain" :height="300" :width="300" />
      <Echarts class="echarts" :opt="heart" :height="300" :width="300" />
      <Echarts class="echarts" :opt="behavior" :height="300" :width="300" />
    </div>

    <div class="title1">High Level Insights</div>
    <div class="two-col">
      <div>
        What the team did well:
        <ul>
          <li>Active Listening</li>
          <li>Alignment and Engagement</li>
          <li>Took ownership</li>
        </ul>
      </div>
      <!--  -->
      <div>
        What the team can improve:
        <ul>
          <li>Clarity</li>
          <li>Participation</li>
          <li>Sentiment</li>
        </ul>
      </div>
    </div>
    <Echarts class="echarts" :opt="ov" style="width:100%; aspect-ratio: 3/1;" />
    <div class="ovdes">
      <p>
        a. Lorem ipsum dolor sit amet, consectetuer adipiscing e, quis nostrud exerci </p>
      <p>
        b. dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam

      </p>
      c. nostrud exerci tationum zzril delenit augue duis dolore
      <p></p>


    </div>

    <div class="overall-title">Tips:</div>
    <ol class="tips">
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing e, quis nostrud exerci tationum zzril delenit augue duis
        dolore</li>
      <li>Consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tationum zzril delenit augue duis dolore</li>
      <li>Nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
        quis nostrud exerci tationum zzril delenit augue duis dolore</li>
    </ol>



    <h3 style="color:#6E974D">
      <img class="ilogo" src="./assets/hand-with-bg.svg" />
      RADDAR
    </h3>
    <Echarts class="echarts" :opt="raddar" style="width:40em; aspect-ratio: 1/1;" />

    <div class="spline"></div>


    <h3 style="color:#6E974D">
      <img class="ilogo" src="./assets/hand-with-bg.svg" />
      2D valence-arousal
    </h3>
    <Echarts class="echarts" :opt="heatmap" style="width:40em; aspect-ratio: 1.2/1;" />


    <div class="overall-title">Tips:</div>
    <ul class="tips">
      <li>Generally, the team listened to one another actively and well.</li>
      <li>The team seemed to support one another and be open to ideas</li>
    </ul>

    <div class="spline"></div>


    <h3 style="color:#DEA45E">
      <img class="ilogo" src="./assets/brain-with-bg.svg" />
      Brain Frenquency Variance Synchrony
    </h3>
    <br/>
    <br/>

    <h3>
      Brain Frenquency Variance Signal
    </h3>
    <br/>
    <br/>

    <div class="spline"></div>
    <h3 style="color:#6B2524">
      <img class="ilogo" src="./assets/heart-with-bg.svg" />
      Heart Rate Synchrony
    </h3>
    <Echarts class="echarts" :opt="rppg_sync" style="width:100%; aspect-ratio: 3/1;" />
    <h3>Heart Rate Signal</h3>
    <Echarts class="echarts" :opt="rppg_signal" style="width:100%; aspect-ratio: 3/1;" />
    <h3>Power of Heart Rate Signal</h3>
    <Echarts class="echarts" :opt="rppg_power" style="width:100%; aspect-ratio: 3/1;" />

    <div class="spline"></div>

    <h3 style="color:#6E974D">
      <img class="ilogo" src="./assets/hand-with-bg.svg" />
      Emotional Synchrony (Positive or Negative)
    </h3>
    <Echarts class="echarts" :opt="arousal_signal_syn" style="width:100%; aspect-ratio: 3/1;" />
    <h3>Emotional Signal (Positive or Negative)</h3>
    <Echarts class="echarts" :opt="arousal_signal" style="width:100%; aspect-ratio: 3/1;" />
    <div class="overall-title">Tips:</div>
    <ul class="tips">
      <li>The Team aligned on the need to make changes to PM and sales support</li>
    </ul>
    <div class="spline"></div>

    <h3 style="color:#6E974D">
      <img class="ilogo" src="./assets/hand-with-bg.svg" />
      Attentiveness Synchrony
    </h3>
    <Echarts class="echarts" :opt="valence_signal_syn" style="width:100%; aspect-ratio: 3/1;" />
    <h3>Attentiveness Signal</h3>
    <Echarts class="echarts" :opt="valence_signal" style="width:100%; aspect-ratio: 3/1;" />

    <div class="spline"></div>


    <h3>Sentiment Overview</h3>
    <div class="legend">
      <div class="legend-item" v-for="v, k in types" :key="k">
        <div class="ff" :style="{ 'background-color': v }"></div>{{ k }}
      </div>
    </div>
    <Echarts class="echarts" :opt="gantt" style="width:100%; aspect-ratio: 2.5/1;" />

    <div class="spline"></div>

    <h3>Language Use Overview</h3>
    <div class="legend">
      <div class="legend-item" v-for="v, k in types2" :key="k">
        <div class="ff" :style="{ 'background-color': v }"></div>{{ k }}
      </div>
    </div>

    <Echarts class="echarts" :opt="dialog" style="width:100%; aspect-ratio: 2.5/1;" />

    <div class="overall-title">Tips:</div>
    <ul class="tips">
      <li>Leaders give opinions last, if at all</li>
      <li>Team members should try to Interrupt less at this stage,
        <ul>
          <li>it seemed that some ppl on the team did not react well to burstiness, which indicates that the team was
            still relatively trying to get to developing group norms</li>
        </ul>
      </li>
      <li>Seek greater direct involvement of the team</li>
      <li>Strive for more equal participation from every member of the group</li>
      <li>More open ended questions vs statements of opinion</li>
      <li>Team members should avoid talking over each other as much at this time</li>
    </ul>

    <div class="spline"></div>
    <br />
    <br />
    <br />
    <div class="title1">Supplementary Information:</div>
    <div class="ultitle">What team did well:</div>
    <ul class="tips">
      <li>Team Lead took responsibility for some shortcomings and some missed objectives, setting the other members at
        better ease</li>
      <li>Seemed relatively new, but well formed team with a good communication style </li>
      <li>Good acknowledgement from team for work put in by Sydney / P1</li>
      <li>The team communicated thoughts and eventually aligned well</li>
    </ul>
    <div class="ultitle">What the team can improve:</div>
    <ul class="tips">
      <li>Allow the team to uncover and discover more before Team Lead and / or DRI gives their opinion</li>
      <li>Seek greater clarity on what aligned with the organization’s objectives</li>
      <li>Unpack the problem to solve more completely to avoid only servicing the symptoms, rather than the root causes
      </li>
      <li>It was relatively clear that something needed to be done to address the marketing issues vis a vis the rest of
        the organization, specifically sales,
        <ul>
          <li>However, there was less clarity on what needed to be done, and to some degree, how to do it</li>
        </ul>
      </li>
      <li>Team Leader and DRI must manage up the chain of command more effectively than they have been doing - as with
        the VP</li>
      <li>Stakeholders must establish the chain of command on this project / initiative</li>
      <li>Strive for greater exploration of options on how to solve topics</li>
      <li>Team / DRI needs to communicate with stakeholders with greater clarity</li>
      <li>Ownership within the organization needs to be clearly established</li>
      <li>Organization needs to improve communication and clarity up and down the chain of command</li>
    </ul>
    <div class="ultitle">Individual tips</div>
    <br/>
    <div class="ultitle">P1 / Sydney DRI - directly responsible individual - the buck stops here</div>
    <ul class="tips">
      <li>Headline then ask questions</li>
      <li>Be less exasperated</li>
      <li>Be more patient in explaining your work</li>
      <li>Be more patient with your team members</li>
      <li>Be more self aware -</li>
      <li>Ask more open ended questions of the entire team</li>
      <li>Take more time to uncover other obstacles to accomplishing the goal</li>
      <li>Clearly define the goal</li>
      <li>Clearly define why that’s important</li>
      <li>Ask more questions</li>
    </ul>

    <div class="ultitle">P2 / PMM Lead - most senior person on the team</div>
    <ul class="tips">
      <li>Give opinions last</li>
      <li>Survey team first</li>
      <li>Be more self aware</li>
      <li>Talk less</li>
      <li>Ask more open ended questions</li>
      <li>Help team clearly define goal</li>
      <li>Help team clearly define why’s</li>
    </ul>


    <div class="ultitle">P3 /</div>
    <ul class="tips">
      <li>Listen more actively</li>
      <li>Interrupt less at this stage of the teams development</li>
      <li>Does not seem like P3 has earned the right to interrupt as yet</li>
      <li>No mansplaining</li>
      <li>Agree with non-verbal communication - nods, thumbs up</li>
      <li>Keep note of your important points and give them at natural pause in the conversation with P1</li>
    </ul>

    <div class="ultitle">P4</div>
    <ul class="tips">
      <li>Face the camera</li>
      <li>Looking sideways makes it seem that there is something more important than the meeting at hand</li>
      <li>This person seems to be a bit guarded in his opinions</li>
      <li>Move hand away from mouth when speaking</li>
      <li>Seemed more decisive and powerful when facing the camera</li>
      <li>Share opinions / thoughts more</li>
      <li>Ask more questions to uncover information from the team</li>
    </ul>
  </div>

</template>

<style scoped>
.spline {
  width: 100%;
  border-bottom: solid 1px #dbdbdb;
}

.echarts {
  margin: 1em auto;
  page-break-inside: avoid
}

.top {
  /* font-size: 28px; */
  height: 2.4em;
  line-height: 2em;
  width: 100vw;
  padding: 0.2em 1.5em;
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
  height: 1.6em;
  margin: 0.2em 1em 0.2em 0;
}

.ilogo {
  height: 1.2em;
  position: relative;
  bottom: -0.2em;
}

.toptext {
  font-size: 115%;
  font-weight: normal;
  line-height: 1.15em;
  margin: 0 1em;
}

.con {
  /* width: 75vw; */
  /* padding: 1em; */
  /* margin: auto; */
}

.thr {
  width: 60em;
  display: flex;
  margin: auto;
}

.overall-title {
  font-size: 1.6em;
  font-weight: bold;
  /* font-size: 42px; */
  color: #656565;
  text-align: left;
  margin: 1em 0;
}

.overall-head {
  font-size: 2em;
  font-size: 30px;
  font-weight: 600;
  color: #525353;
}

.overall-score {
  margin: 0.5em 0;
  font-size: 70px;
  /* font-size: 4.5em; */
  font-weight: 600;
  color: #242424;
}

.overall-des {
  width: 15em;
  font-size: 24px;
  font-weight: normal;
  line-height: 1.58;
  color: #525353;
  margin: 1em auto;
}

h3 {
  font-size: 125%;
  text-align: left;
  color: #A3A3A0;
}

.ovdes {
  /* font-size: 25px; */
  color: #525353;
  line-height: 2.4;
  margin-left: 8em;
  text-align: left;
}

.ovdes p {
  margin: 0;
}

.tips {
  text-align: left;
  font-weight: 300;
  color: #525353;
}

.tips li {
  margin: 2em 0;
}

.ff {
  width: 1em;
  height: 1em;
  display: inline-block;
  margin: 0 0.5em;
  position: relative;
  bottom: -0.2em;
}

.legend {
  width: 50em;
  margin: auto;
}

.legend-item {
  display: inline-block;
}

.two-col {
  display: flex;
  justify-content: space-evenly;
  text-align: left;
}

.title1 {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0.5em;
}

.ultitle {
  text-align: left;
}

@media print {

  .top {
    width: 100%;
    position: relative;
    z-index: 999;
  }

  .con {
    width: 75%
  }

}
</style>
