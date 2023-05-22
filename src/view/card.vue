<script setup lang="ts">
import { ref, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";
let baseurl = import.meta.env.VITE_API_URL

const props = defineProps<{meeting:any}>()
const router = useRouter()
const route = useRoute()
function handleClick() {
  router.push(`/home/${props.meeting.team_id??'0'}/${props.meeting.meeting_id??'0'}/`)
}
</script>

<template>
  <div class="con">
    <div class="card" @click="handleClick" :style="{backgroundImage:`url(${meeting.thumbnail})`}"></div>
    <div class="cardtxt">meeting ID: {{ meeting.meeting_id }}</div >
  </div>
</template>

<style scoped>
.cardtxt{
  margin-top: 0.5em;
  color: rgb(209, 214, 237);
}
.con {
  font-size: large;
  /* font-weight: bold; */
  color: black;
}

.filename {
  display: inline-block;
  max-width: 10em;
  /* height: 1.1em; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.del {
  margin-left: 0.5em;
  color: #e9e9e9;
}

.del:hover {
  cursor: pointer;
  color: rgb(175, 175, 175);
}

.card {
  height: 10em;
  /* width: 12em; */
  aspect-ratio: 16 / 9;
  background-color: #000000;
  border-radius: 1rem;
  color: white;
  font-weight: bolder;
  font-size: large;
  box-shadow: 0 0 10px 2px #00000043;
  transition: all 0.3s;
  box-sizing: content-box;
  border: solid 2px rgba(255, 255, 255, 0);
  background-size: 110%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.card:hover {
  /* border: solid 2px rgba(52, 143, 228, 0.835); */
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.469);
  cursor: pointer;
  transition: all 0.3s;
}
</style>