<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import { UploadFilled } from '@element-plus/icons-vue'

import Card from "./card.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
let list = ref([])

onMounted(async () => {
  try{
    list.value = (await axios.get('/meeting/video')).data.data
  } catch(e){
    
  }
})
async function successfun() {
  ElMessage.success('success')
  setTimeout(()=>location.reload(),1000)
}
</script>

<template>
  <div class="top">
      <div style="display: flex;">
      <img src="@/assets/Logo-white.svg" class="logo" alt="logo" />
        <strong>Syneurgy Team Performance Report</strong></div>
  </div>
  <div class="upload-con">
    <el-upload
    class="upload"
    drag
    action="/api/upload"
    :on-success="successfun"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop you meeting video file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        mp4/mov files 
      </div>
    </template>
  </el-upload>
  </div>
  
  <div class="content">
    <template v-for="item in list" :key="item.meeting_id">
      <Card :file="(item as any).video_url" :img="(item as any).img_url" :meeting-id="(item as any).meeting_id"/>
    </template>
    <Card :file="'demo.mp4'"/>
  </div>
</template>

<style scoped lang="scss">
.upload-con{
  margin-top: 2em;
  padding: 1em;
}
.upload{
  min-width: 10em;
  max-width: 40em ;
  margin: auto;
}
.content {
  display: grid;
  padding: 4em 8em;
  gap: 4em;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
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
  background-color: #D39D5E;
  color: white;
  z-index: 999;
  .logo {
    height: 2em;
    margin: 0.75em 1em 0.75em 0;
  }
}
</style>