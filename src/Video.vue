<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { getEmitter } from "./mitt";

let video = ref<HTMLVideoElement>();
const props = defineProps({file:String,cache:Boolean})
const loading = ref(true)
let baseurl = import.meta.env.VITE_API_URL
onMounted(async () => {
  if(props.cache) blob_load(props.file!).then((e:any)=>{
    video.value!.src = e as string
    loading.value = false
  })
  else loading.value = false

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
    axios.get(src,{
      responseType: 'blob'
    }).then((res:any)=>{
      reslove(window.URL.createObjectURL(new Blob([res.data], { type: 
        'video/mpeg4'
        // res.headers['content-type'] 
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
    <source v-if="!props.cache" :src="baseurl+file" type="video/mp4">
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
