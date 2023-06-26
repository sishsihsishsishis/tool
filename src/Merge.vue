<script setup lang="ts">
import { ref, Ref, computed, inject } from "vue"
import { objectEntries, useVModels } from '@vueuse/core'
const emit = defineEmits(['update:drawer'])
import axios from 'axios'
import { ElMessage } from 'element-plus'

const meetingInfo = inject<Promise<{video_url:string}>>('meetingInfo',Promise.resolve({video_url:""}))

let baseurl = import.meta.env.VITE_API_URL

const props = defineProps<{ modelValue: boolean, meeting_id: number }>()
const { modelValue } = useVModels(props, emit)
let matchVideo = ref<HTMLVideoElement>();

async function onOpen() {
  matchVideo.value!.src = (await meetingInfo).video_url
  let {userAvatar:user_avatar} = (await axios.get(`/meeting/avatar/${props.meeting_id}`)).data.data
  userAvatar.value = user_avatar
  select.value = Object.fromEntries(Object.keys(userAvatar.value??{}).map(e=>[e,false]))
}
async function onclose() {

}

const userAvatar = ref<{[key :string]:string}>()
let users = computed(()=>Object.keys(userAvatar.value??{}).sort())
const select = ref<{[key :string]:boolean}>({})
function Select(u:string){
  select.value[u]=!select.value[u]
  console.log(select.value)
}

function Merge(){

}
</script>

<template>
  <el-drawer v-model="modelValue" :size="'100%'" :append-to-body="true" :with-header="true" @open="onOpen"  @close="onclose"
    title="Merge Video User" direction="btt">

      <div class="h-full w-full flex flex-col">
        <video class="flex-none h-1/2 mx-auto my-0 aspect-video" ref="matchVideo" id="matchVideo" controls="true" preload="Auto" autoplay muted></video>
        
        <div class="flex justify-around px-16 pt-10">
          <div class="" v-for="u in users" :key="u">
            <img class="w-32 h-32 box-content rounded-2xl mx-0 shadow-lg border-4 hover:border-teal-300 shadow-gray-300" 
              :class="{'border-teal-300':select[u],'border-gray-100':!select[u]}"
              @click="Select(u)"
              :src="`${baseurl}/meeting/img/${meeting_id}/${userAvatar![u as keyof typeof userAvatar]}`" onerror="this.classList.add('error');">
            <div class="text-center my-2 w-full">{{u}}</div>
          </div>
        </div>
        <el-button class="bg-green-500 mx-16 text-white hover:text-white hover:bg-green-400" @click="Merge()">Merge:  {{ objectEntries(select).filter(e=>e[1]).map(e=>e[0]).join(', ') }}</el-button>

      </div>

  </el-drawer>
</template>
