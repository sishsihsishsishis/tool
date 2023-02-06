<script setup lang="ts">
import { ref, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";
const props = defineProps({ file: String, img: String, meetingId:Number })
const router = useRouter()
const route = useRoute()
function handleClick() {
  let l = props.file?.split('/') ?? ''
  router.push(`/home/${props.meetingId??'0'}/`)
}
let Delete = async (file:string|undefined)=>axios.delete('/delete/'+file).then(()=>ElMessage.success('success')).then(()=>location.reload())
let See = async (file:string|undefined)=>axios.get('/download/'+file).then((e)=>alert(e.data))
function getAssetsUrl(u:string) {
    return new URL(`/data/assets/${u}`, import.meta.url).href;
}
function getAssetsUrls(u:string) {
  return import.meta.env.VITE_API_URL+u
}
</script>

<template>
  <div class="con">
    <template v-if="file=='demo.mp4'">
      <div class="card" @click="handleClick" :style="{backgroundImage:`url(${getAssetsUrl('demo.png')})`}"></div>
      <span class="filename">{{ file }}</span>
    </template>
    <template v-else>
      <div class="card" @click="handleClick" :style="{backgroundImage:`url(${getAssetsUrls(img!)}`}"></div>
      <span class="del" @click="See(file)">see</span><span class="filename">{{ file }}</span><span class="del" @click="Delete(file)">del</span>
    </template>
    
  </div>
</template>

<style scoped>
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
  height: 6em;
  width: 12em;
  background-color: #ffffff;
  border-radius: 1rem;
  color: white;
  font-weight: bolder;
  font-size: large;
  box-shadow: 0 0 10px 2px #e9e9e9;
  transition: all 0.3s;
  box-sizing: content-box;
  border: solid 2px rgba(73, 73, 73, 0.277);
  /* background-image: url('@/assets/default_topo.png'); */
  background-size: 95%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.card:hover {
  border: solid 2px rgb(85, 140, 199);
  box-shadow: 0 0 10px 5px #e9e9e9;
  cursor: pointer;
  transition: all 0.3s;
}
</style>