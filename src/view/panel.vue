<script setup lang="ts">
import { ref, provide, onMounted, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import Score from "./score.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
let teamIDSet = ref(new Set());
let teamID = ref("999");
let loading = ref(false);
let Fscores = ref([]);
const router = useRouter();
const route = useRoute();
let sc = ref<null | {init: () => void}>(null);
onMounted(async () => {
  try {
    findScoreList();
    (await axios.get(`/meeting/video/`)).data.data.forEach((e:any) => teamIDSet.value.add(e.team_id));
  } catch (e) {}
});

// watchEffect(async () => {
//   if (teamID.value !== ""){
//     findScoreList()
//     sc.value?.init()
//   }
// });
async function scupdate() {
  if (teamID.value !== ""){
    loading.value = true
    findScoreList()
    sc.value?.init()
  }
}
async function findScoreList() {
  const response = await axios.get('/score', {
    params: {
      teamId: teamID.value
    }
  });
  Fscores.value = response.data.data.sort((a: any, b: any) => a.meetingId - b.meetingId);
  loading.value = false
  console.log(response.data.data)
}
</script>

<template>
  <div class="top">
    <div style="display: flex">
      <img src="@/assets/Logo-white.svg" class="logo" alt="logo" @click="router.push('/home')"/>
      <strong>Syneurgy Team Performance Report</strong>
    </div>
  </div>
  <div id="con">
    <div class="topinput">
      <div class="flex flex-row">
        <el-input class="basis-1/2"
          size="large"
          v-model="teamID"
          placeholder="TeamID"
          @change="scupdate"
        >
          <template #prepend>Team ID:</template>
          <template #append>
            <el-button @click="scupdate">GO</el-button>
            <!-- no handle filiter:
            <el-switch
              @change="fil"
              v-model="handle_filter"
              class="ml-2"
              style="--el-switch-on-color: #13ce66"
            /> -->
          </template>
        </el-input>
        <div class="basis-1/2 py-2">
          Teams: {{ Array.from(teamIDSet).join(", ") }}
        </div>
      </div>
      <div class="my-1">
      </div>
    </div>
    <div class="mx-16">
      <div>
        <Score ref="sc" @loading="loading = true" @update="findScoreList()" :teamid="teamID" ></Score>
      </div>
      <div class="my-10">
        <el-table
        v-loading="loading"
        :data="Fscores" border stripe>
            <el-table-column prop="teamId" width="80" label="Team ID"></el-table-column>
            <el-table-column prop="meetingName" width="500" label="Meeting Name"></el-table-column>
            <el-table-column prop="meetingId" width="120"  label="Meeting ID"></el-table-column>
            <el-table-column prop="body_score" width="120" label="Body Score"></el-table-column>
            <el-table-column prop="behavior_score" width="140" label="Behavior Score"></el-table-column>
            <el-table-column prop="total_score" width="120" label="Total Score"></el-table-column>
            <el-table-column prop="nlp_equal_participation" label="Nlp Equal Participation"></el-table-column>
            <el-table-column prop="nlp_speaker_time" label="Nlp Speaker Time"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#con {
  padding-top: 1.5em;
  // background-color: #1b202e;
  min-height: 100vh;
}

.content {
  display: grid;
  padding: 1em 2em;
  gap: 3em;
  grid-template-columns: 1fr 1fr 1fr;
  width: 80%;
  margin: auto;
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
  // background-color: #222a40;
  background-color: #CB9F68;
  // color: white;
  color:white;
  z-index: 999;

  .logo {
    height: 2em;
    margin: 0.75em 1em 0.75em 0;
  }
}

.topinput {
  overflow: hidden;
  margin-top: 10em;
  max-width: 60%;
  margin: 0em auto;
}
</style>