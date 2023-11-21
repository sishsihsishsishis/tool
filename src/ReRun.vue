<script setup lang="ts">
import { ref, Ref, onMounted, inject } from "vue"
import { useMounted } from './useTools'
import { objectEntries, useVModels } from '@vueuse/core'
const emit = defineEmits(['update:drawer'])
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { number } from "echarts";

const meetingInfo = inject<Promise<{ video_url: string }>>('meetingInfo', Promise.resolve({ video_url: "" }))

let baseurl = import.meta.env.VITE_API_URL
let paramvalue = ref<Number>(0.5)
const props = defineProps<{ modelValue: boolean, meeting_id: string }>()
const { modelValue } = useVModels(props, emit)

async function onOpen (){
  paramvalue.value = (await axios.post('/score/detail/'+props.meeting_id)).data.data.threshold ?? 0.7
}


function submit(){
  axios.post('/score/threshold/'+props.meeting_id+`?threshold=${paramvalue.value}`).then(res=>{
    if(res.data.success) {
      alert('Success')
      location.reload()
    }
  })
  // axios.post('/score/threshold/'+props.meeting_id,//`threshold=${paramvalue.value}`)
  // {
  //   // meetingId:parseInt(props.meeting_id),
  //   threshold:paramvalue.value,
  // })
}
</script>

<template>
  <el-drawer v-model="modelValue" :size="'30%'" :append-to-body="true" :with-header="true" @open="onOpen"
    @close="" title="Re Run Model" direction="ttb">
    <div class="w-full flex flex-col items-center gap-5">
        <el-slider class="w-96" v-model="paramvalue" show-input :step="0.1" :min="0" :max="1"> </el-slider>
        <el-button class="w-48" @click="submit">Submit</el-button>
    </div>
  </el-drawer>
</template>
