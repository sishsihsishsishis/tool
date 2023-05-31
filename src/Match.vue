<script setup lang="ts">
import { ref, Ref, onMounted, inject } from "vue"
import { useVModels } from '@vueuse/core'
const emit = defineEmits(['update:drawer'])
import axios from 'axios'
import { ElMessage } from 'element-plus'
import RabbitLyrics from 'rabbit-lyrics'
const meetingInfo = inject<Promise<{video_url:string}>>('meetingInfo',Promise.resolve({video_url:""}))

let baseurl = import.meta.env.VITE_API_URL

const props = defineProps<{ modelValue: boolean, meeting_id: number }>()
const { modelValue } = useVModels(props, emit)

const speakerUsers = ref<Array<{ user_name: string, speaker_name: string[] }>>([])
const speakerNames = ref<{ [key: string]: boolean }>({})
const lyricStr = ref<string>()

function Nlp2Lrc(nlpstr:string) {
  let lines = nlpstr.split('\n')
  const Idx = lines.shift()!.split('\t').map(e => e.trim())
  let nlp = lines.map(e => Object.fromEntries(e.split('\t').map((e, index) => [Idx[index], e.trim()])))
  function TimeTran(secstr:string) {
    let [secs, ms] = secstr.split('.')
    let sec = parseInt(secs)
    let h = (sec) / 3600
    let m = ((sec) % 3600) / 60
    let s = (sec) % 60
    return (h > 1 ? h.toFixed(0).padStart(2, '0') + ':' : '') + `${m.toFixed(0).padStart(2, '0')}:${s.toFixed(0).padStart(2, '0')}.${ms}`
  }
  let lrc = nlp.map((e, index) => {
    if(e.Start == undefined) return ""
    // return `[${TimeTran(e.Start)}]${e.Speaker}: ${e.Sentence}\n[${TimeTran(e.End)}]`
    return `[${TimeTran(e.Start)}]${e.Speaker}: ${e.Sentence}`
  }).join('\n')
  return lrc
}
async function fetchData() {
  const nlpStr =  axios.get(`/s3/downloads/${props.meeting_id}/nlp_result.txt`)

  const response = await axios.get(`/speaker-users?meeting_id=${props.meeting_id}`)
  const match_result = await (await axios.get(`/match-result/${props.meeting_id}`)).data.data.match_result
  speakerUsers.value = response.data.data.speakerUsers.map((e: any) => ({ user_name: e.user_name, speaker_name: [] }));
  speakerNames.value = Object.fromEntries(response.data.data.speakerNames.map((e: any) => [e.speaker_name, false]));
  speakerUsers.value.forEach((e: { user_name: string, speaker_name: string[] }) => e.speaker_name = match_result[e.user_name]??"")
  for (let u in match_result) {
    match_result[u].forEach((i: string) => {
      speakerNames.value[i] = true;
    })
  }
  lyricStr.value = Nlp2Lrc((await nlpStr).data)
}
async function updateSpeakerNames() {
  const updateData = {
    meeting_id: props.meeting_id,
    user_speakers: Object.fromEntries(speakerUsers.value.map(user => [user.user_name, user.speaker_name]))
  };

  await axios.post('/update-speaker-names', updateData);
  modelValue.value = false;
  ElMessage.success('Speaker names updated');
}
function updataDisabled(item: string) {
  speakerNames.value[item] = false;
}
function updataDisabled2(item: string[]) {
  item.forEach(e => speakerNames.value[e] = true)
}

let matchVideo = ref<HTMLVideoElement>();
let lyricsDiv = ref<HTMLElement>()
async function onOpen() {
  await fetchData()
  matchVideo.value!.src = (await meetingInfo).video_url
  new RabbitLyrics(lyricsDiv.value!,matchVideo.value as HTMLMediaElement,{viewMode:'full',alignment:'left'})
}
async function onclose() {
  speakerUsers.value = []
  speakerNames.value = {}
}
</script>

<template>
  <el-drawer v-model="modelValue" :size="'100%'" :append-to-body="true" :with-header="true" @open="onOpen"  @close="onclose"
    title="Match Video User & Speaker" direction="btt">
    <div class="flex h-full w-full gap-6 overflow-hidden">
      <div class="h-full w-full flex flex-col">
        <video class="flex-none w-full aspect-video" ref="matchVideo" id="matchVideo" controls="true" preload="Auto" autoplay muted></video>
        <el-table :data="speakerUsers" :border="true" class="shrink h-full">
          <el-table-column :width="80" label="Avatar">
            <template #default="scope">
              <img class="w-10 h-10 rounded-md" :src="`${baseurl}/meeting/img/${props.meeting_id}/${scope.row.user_name}.jpg`"
                onerror="this.classList.add('error');">
            </template>
          </el-table-column>
          <el-table-column :width="150" prop="user_name" label="User Name"></el-table-column>
          <el-table-column :width="150" prop="speaker_name" label="Speaker Name"></el-table-column>
          <el-table-column label="Match">
            <template #default="scope">
              <el-select v-model="scope.row.speaker_name" placeholder="Select Speaker" multiple
                @remove-tag="updataDisabled" @change="updataDisabled2">
                <el-option v-for="(item, key) in speakerNames" :key="key" :label="key" :value="key"
                  :disabled="scope.row.speaker_name.includes(key) ? false : item"></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
    </div>
      <div class="flex flex-col w-full">
        <div class="rabbit-lyrics grow bg-slate-300" ref="lyricsDiv" data-media="#matchVideo">
              {{ lyricStr }}
        </div>
        <div class="flex-none pt-5">
          <el-button class="bg-green-500 text-white hover:text-white hover:bg-green-400" @click="updateSpeakerNames">Update Speaker Names</el-button>
        </div>
      </div>
    </div>

  </el-drawer>
</template>
