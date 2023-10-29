<script setup lang="ts">
import { ref, provide, onMounted, watchEffect } from "vue";
import { UploadFilled } from '@element-plus/icons-vue'
import { useRouter, useRoute } from "vue-router";
import Card from "./card.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
let list = ref([])
let Rlist = ref([])
let Alist = ref([])
let teamIDSet = ref(new Set())
let teamID = ref('999')
let handle_filter = ref(false)
const router = useRouter()
const route = useRoute()
onMounted(async () => {
  try {
    Alist.value = (await axios.get(`/meeting/video/`)).data.data
    Alist.value.forEach(e=>teamIDSet.value.add(e.team_id)) 
    // teamID.value = '999';
    // list.value = (await axios.get(`/meeting/video/${teamID.value}`)).data.data
  } catch (e) {

  }
})
watchEffect(async () => {
  if(teamID.value=='')
    Rlist.value = (await axios.get(`/meeting/video/`)).data.data
  else
    Rlist.value = (await axios.get(`/meeting/video/${teamID.value}?currentPage=${1}&pageCount=${10}`)).data.data?.list
  fil()
})

function fil(){
  list.value = Rlist.value.filter((e:any)=>handle_filter.value?e.is_handle!==1:true)
}


async function successfun() {
  ElMessage.success('success')
  setTimeout(() => location.reload(), 1000)
}

function handleClick() {
  router.push(`/panel/`)
}
</script>

<template>
  <div class="top">
    <div style="display: flex;">
      <img src="@/assets/Logo-white.svg" class="logo" alt="logo" />
      <strong>Syneurgy Team Performance Report</strong>
    </div>
  </div>
  <div id="con">
    <div class="topinput">
      <div class="flex flex-row">
      <el-input class="basis-3/4" size="large" v-model="teamID" placeholder="TeamID">
        <template #prepend>Team ID:</template>
        <template #append>
          no handle filiter:
          <el-switch
            @change="fil"
            v-model="handle_filter"
            class="ml-2"
            style="--el-switch-on-color: #13ce66;"
          />
        </template>
      </el-input>
      <div class="w-1/4">
        <button @click="handleClick">Parameter Panel</button>
      </div>
    </div>
      <div style="color: aliceblue;margin-top: 1em;">Teams: {{ Array.from(teamIDSet).join(', ') }}</div>
    </div>

    <div class="content">
      <template v-for="item in list" :key="item.meeting_id">
        <Card :meeting="item" />
      </template>
      <!-- <Card :file="'demo.mp4'" :meeting-id="1"/> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
#con {
  padding-top: 5em;
  background-color: #1B202E;
  min-height: 100vh;
}

.content {
  display: grid;
  padding: 4em 2em;
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
  background-color: #222a40;
  color: white;
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
}</style>