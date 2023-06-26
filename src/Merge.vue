<script setup lang="ts">
import { ref, Ref, computed, inject } from "vue"
import { objectEntries, useVModels } from '@vueuse/core'
const emit = defineEmits(['update:drawer'])
import axios from 'axios'
import { ElMessage } from 'element-plus'

const meetingInfo = inject<Promise<{ video_url: string }>>('meetingInfo', Promise.resolve({ video_url: "" }))

let baseurl = import.meta.env.VITE_API_URL

const props = defineProps<{ modelValue: boolean, meeting_id: string }>()
const { modelValue } = useVModels(props, emit)
let matchVideo = ref<HTMLVideoElement>();

async function onOpen() {
  matchVideo.value!.src = (await meetingInfo).video_url
  let { userAvatar: user_avatar } = (await axios.get(`/meeting/avatar/${props.meeting_id}`)).data.data
  userAvatar.value = user_avatar
  map.value = Object.fromEntries(Object.keys(userAvatar.value ?? {}).map(e => [e, e]))
}
async function onclose() {

}

const userAvatar = ref<{ [key: string]: string }>()
let users = computed(() => Object.keys(userAvatar.value ?? {}).sort())
const map = ref<{ [key: string]: string }>({})


function handleCommand(cmd: string) {
  let [from, to] = cmd.split('|')
  console.log(cmd)
  map.value[from] = to
}
</script>

<template>
  <el-drawer v-model="modelValue" :size="'100%'" :append-to-body="true" :with-header="true" @open="onOpen"
    @close="onclose" title="Merge Video User" direction="btt">
    <div class="h-full w-full h-full flex flex-col">
      <!-- <div class="flex w-full h-full gap-6 overflow-hidden"> -->
        <video class="flex h-1/2 mx-auto mt-0 aspect-video" ref="matchVideo" id="matchVideo" controls="true" preload="Auto" autoplay
          muted></video>
      <!-- </div> -->
      <div class="flex min-h-[15em] justify-around px-16 pt-32">
        <div class="" v-for="u in users" :key="u">
          <el-dropdown trigger="click" @command="handleCommand">
            <div
              class="w-32 h-32 box-content rounded-2xl mx-0 shadow-lg border-4 hover:border-teal-300 shadow-gray-300 bg-cover el-dropdown-link"
              :style="{ 'background-image': `url(${baseurl}/meeting/img/${meeting_id}/${userAvatar![u as keyof typeof userAvatar]})` }"
              onerror="this.classList.add('error');">
              <svg class="p-8 w-32 h-32 opacity-0 hover:opacity-100" t="1687762327559" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3251" width="200" height="200">
                <path
                  d="M820.598154 810.692923H594.766769a39.384615 39.384615 0 0 1-39.384615-39.384615 39.384615 39.384615 0 0 1 39.384615-39.384616h225.831385a39.384615 39.384615 0 0 1 39.384615 39.384616 39.384615 39.384615 0 0 1-39.384615 39.384615z"
                  fill="#73E3D0" fill-opacity="0.75" p-id="3252"></path>
                <path
                  d="M377.304615 810.692923h-93.814153a77.469538 77.469538 0 0 1-55.138462-22.823385 77.371077 77.371077 0 0 1-22.843077-55.138461v-93.833846a77.568 77.568 0 0 1 22.843077-55.138462l338.274462-338.313846a93.873231 93.873231 0 0 1 66.776615-27.569231 93.774769 93.774769 0 0 1 66.737231 27.569231l70.104615 70.065231a94.523077 94.523077 0 0 1 27.844923 67.268923 94.523077 94.523077 0 0 1-27.825231 67.229538L432.403692 787.830154a77.449846 77.449846 0 0 1-55.099077 22.862769z m-93.006769-77.981538z m0-0.807385h93.006769l337.270154-337.565538a16.246154 16.246154 0 0 0 4.765539-11.559385 16.187077 16.187077 0 0 0-4.785231-11.559385l-70.084923-70.06523a15.497846 15.497846 0 0 0-11.047385-4.588308 15.596308 15.596308 0 0 0-11.086769 4.588308l-338.274462 338.313846z"
                  fill="#73E3D0" fill-opacity="0.75" p-id="3253"></path>
                <path
                  d="M647.069538 554.377846a39.246769 39.246769 0 0 1-28.022153-11.697231l-144.423385-146.294153a39.384615 39.384615 0 0 1 0.354462-55.709539 39.384615 39.384615 0 0 1 55.689846 0.354462l144.344615 146.294153a39.384615 39.384615 0 0 1-0.354461 55.709539 39.266462 39.266462 0 0 1-27.588924 11.342769z"
                  fill="#73E3D0" fill-opacity="0.75" p-id="3254"></path>
              </svg>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="uu in users" :key="uu" :command="`${u}|${uu}`">{{ uu }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        <div class="text-center my-2 w-full">{{u}} =>{{ map[u]}}</div>
      </div>
    </div>
    <el-button class="bg-green-500 mx-16 text-white hover:text-white hover:bg-green-400" @click="Merge()">Submit Merge
    </el-button>

  </div>

</el-drawer></template>
