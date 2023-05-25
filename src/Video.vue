<script setup lang="ts">
import axios from 'axios';
import { ref, Ref, onMounted, inject } from 'vue'
import { getEmitter } from "./mitt";
import v from '../data/data-David/assets/demo.mp4'
let video = ref<HTMLVideoElement>();
const props = defineProps({cache:Boolean})
const meetingInfo = inject<Promise<{video_url:string}>>('meetingInfo',Promise.resolve({video_url:""}))

const loading = ref(true)
let url = ref()
// let baseurl = import.meta.env.VITE_API_URL
onMounted(async () => {
  if(props.cache) blob_load((await meetingInfo).video_url).then((e:any)=>{
    video.value!.src = e as string
  })
  else video.value!.src = (await meetingInfo).video_url
  
  loading.value = false

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


function blob_load (src:string){
  return new Promise(reslove=>{
    fetch(src).then(res=>res.blob()).then((res:any)=>{
      reslove(window.URL.createObjectURL(new Blob([res], { type: 
        'video/mpeg4'
      })))
    })
  })
}
</script>

<template>
  <div v-loading.lock="loading"
  element-loading-text="Loading..."
  element-loading-background="rgba(0, 0, 0, 0.6)"
  style="width: 470px;background-color: black; height: 270;"
  element-loading-custom-class="loading_color"
  >
    <video ref="video" id="video" height="270" width="470" controls="true" preload="Auto" autoplay muted>
      <source v-if="!props.cache" type="video/mp4">
  </video>
  </div>
</template>

<style >
.el-loading-spinner .el-loading-text{
  color: aliceblue;
}
.el-loading-spinner .path {
  stroke: aliceblue
}
</style>
