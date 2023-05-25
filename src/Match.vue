<script setup lang="ts">
import { ref, Ref } from "vue"
import { useVModels } from '@vueuse/core'
const emit = defineEmits(['update:drawer'])
import axios from 'axios'
import { ElMessage } from 'element-plus'
let baseurl = import.meta.env.VITE_API_URL

const props = defineProps<{modelValue: boolean, meeting_id: number }>()
const { modelValue } = useVModels(props,emit)

const speakerUsers = ref<Array<{user_name:string,speaker_name:string[]}>>([])
const speakerNames = ref<{[key: string]:boolean}>({})
async function fetchData() {
  const response = await axios.get(`/speaker-users?meeting_id=${props.meeting_id}`)
  speakerUsers.value = response.data.data.speakerUsers.map((e:any)=>({user_name:e.user_name,speaker_name: e.speaker_name instanceof Array ? e.speaker_name : [e.speaker_name]}));
  speakerNames.value = Object.fromEntries(response.data.data.speakerNames.map((e:string)=>[[e],false]));
  speakerUsers.value.forEach((e:{speaker_name:string[]})=>{
    e.speaker_name.forEach(i=>{
      speakerNames.value[i] = true;
    })
  })
}
async function updateSpeakerNames() {
  const updateData = {
    meeting_id: props.meeting_id,
    user_speakers: speakerUsers.value.map(user => ({
        user_name: user.user_name,
        speaker_name: user.speaker_name
      }))
  };

  await axios.post('/update-speaker-names', updateData);
  modelValue.value = false;
  ElMessage.success('Speaker names updated');
}
function updataDisabled(item:string){
  speakerNames.value[item] = false;
}
function updataDisabled2(item:string[]){
  item.forEach(e=>speakerNames.value[e] = true)
}
</script>

<template>
  <el-drawer
    v-model="modelValue"
    :size="'90%'" 
    :append-to-body="true" :with-header="true"
    title="Match Video User & Speaker"
    direction="btt"
    @open="fetchData"
  >
    <el-table :data="speakerUsers" border style="width: 100%">
      <el-table-column :width="100" label="Avatar" >
        <template #default="scope">
          <img class="mavatar" :src="`${baseurl}/meeting/img/${props.meeting_id}/${scope.row.user_name}.jpg`" onerror="this.classList.add('error');">
        </template>
      </el-table-column>
      <el-table-column :width="300" prop="user_name" label="User Name"></el-table-column>
      <el-table-column :width="300" prop="speaker_name" label="Speaker Name"></el-table-column>
      <el-table-column label="Match">
        <template #default="scope">
          <el-select
            v-model="scope.row.speaker_name"
            placeholder="Select Speaker"
            multiple
            @remove-tag="updataDisabled"
            @change="updataDisabled2"
          >
            <el-option
              v-for="(item,key) in speakerNames"
              :key="key"
              :label="key"
              :value="key"
              :disabled="scope.row.speaker_name.includes(key) ? false : item"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-button type="success" @click="updateSpeakerNames">Update Speaker Names</el-button>
  </el-drawer>

</template>
<style>
.mavatar{
  width: 5em;
  height: 5em;
  border-radius: 0.5em;
  overflow: hidden;
}
</style>