<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { getEmitter } from "./mitt";
import demomp4 from "@/assets/demo.mp4";
let video = ref<HTMLVideoElement>();
const props = defineProps({file:String})
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
  <video ref="video" id="video" height="270" width="470" controls="true">
    <source :src="(file == 'demo.mp4') ? demomp4 : `/api/download/test/${file}`" type="video/mp4">
  </video>
</template>

<style scoped>
</style>
