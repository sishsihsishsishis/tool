<script setup lang="ts">
import { ref,defineEmits, provide ,watchEffect, onMounted} from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";
let baseurl = import.meta.env.VITE_API_URL;
const emit = defineEmits(['update','loading'])

let value = ref(1);
const props = defineProps<{ teamid: any }>();
const router = useRouter();
const route = useRoute();
function handleClick() {}

function init(){
  axios.get("/score/parameter/" + props.teamid).then((response) => {
    console.log(response.data.data);
    let {
      coefficient_behaviour,
      coefficient_body,
      coefficient_brain,
      coefficient_total,
      score_parameter_id,
      team_id,
      weight_behaviour,
      weight_body,
      weight_brain,
      weight_nlp_equal_participation,
      weight_nlp_speak_time,
    } = response.data.data;
    parameters.value.brain.value = coefficient_brain ?? 50;
    parameters.value.brain.weight = weight_brain ?? 0.2;
    parameters.value.body.value = coefficient_body ?? 50;
    parameters.value.body.weight = weight_body ?? 0.2;
    parameters.value.behavior.value = coefficient_behaviour ?? 50;
    parameters.value.behavior.weight = weight_behaviour ?? 0.2;
    parameters.value.nlpSpeakingTime.weight = weight_nlp_speak_time ?? 0.2;
    parameters.value.nlpEqualParticipation.weight =
      weight_nlp_equal_participation ?? 0.4;
    parameters.value.total.value = coefficient_total ?? 50;
    // parameters.value.total.weight = 1;
  });
}
defineExpose({
  init
})
onMounted(() => {
  console.log(props.teamid);
  init()
});
const parameters = ref<{
  brain: { id: string; label: string; value: number; weight: number; min: number; max: number; minWeight: number; maxWeight: number; editableParam: boolean; editableWeight: boolean; };
  body: { id: string; label: string; value: number; weight: number; min: number; max: number; minWeight: number; maxWeight: number; editableParam: boolean; editableWeight: boolean; };
  behavior: { id: string; label: string; value: number; weight: number; min: number; max: number; minWeight: number; maxWeight: number; editableParam: boolean; editableWeight: boolean; };
  nlpSpeakingTime: { id: string; label: string; value: number; weight: number; min: number; max: number; minWeight: number; maxWeight: number; editableParam: boolean; editableWeight: boolean; };
  nlpEqualParticipation: { id: string; label: string; value: number; weight: number; min: number; max: number; minWeight: number; maxWeight: number; editableParam: boolean; editableWeight: boolean; };
  total: { id: string; label: string; value: number; weight: number; min: number; max: number; minWeight: number; maxWeight: number; editableParam: boolean; editableWeight: boolean; };
}>({
  brain:{ id: 'brain', label: 'Brain', value: 50.0, weight: 0.20, min: 0, max: 100, minWeight: 0, maxWeight: 1, editableParam:true, editableWeight: true },
  body:{ id: 'body', label: 'Body', value: 50.0, weight: 0.20, min: 0, max: 100, minWeight: 0, maxWeight: 1, editableParam:true, editableWeight: true },
  behavior:{ id: 'behavior', label: 'Behavior', value: 50.0, weight: 0.20, min: 0, max: 100, minWeight: 0, maxWeight: 1, editableParam:true, editableWeight: true },
  nlpSpeakingTime:{ id: 'nlpSpeakingTime', label: 'NLP speakingtime', value: 50.0, weight: 0.20, min: 0, max: 100, minWeight: 0, maxWeight: 1, editableParam:false, editableWeight: true },
  nlpEqualParticipation:{ id: 'nlpEqualParticipation', label: 'NLP equal participation', value: 50.0, weight: 0.40, min: 0, max: 100, minWeight: 0, maxWeight: 1, editableParam:false, editableWeight: true },
  total:{ id: 'total', label: 'Total', value: 50.0, weight: 0.20, min: 0, max: 100, minWeight: 0, maxWeight: 1, editableParam:true, editableWeight: false }
})

// watchEffect(()=>{
//   parameters.value.find(p => p.id === 'nlpEqualParticipation').weight = 1 
//     - parameters.value.find(p => p.id === 'behavior').weight
//     - parameters.value.find(p => p.id === 'body').weight
//     - parameters.value.find(p => p.id === 'nlpSpeakingTime').weight
// })

async function SubmitAll() {  
  for (team_id of teamIDSet.value) {
    try {
        emit('loading', true)
        const teamScoreDTO = {
          coefficientBody: parameters.value.body.value,
          coefficientBehaviour: parameters.value.behavior.value,
          coefficientTotal: parameters.value.total.value,
          weightBody: parameters.value.body.weight,
          weightBehaviour: parameters.value.behavior.weight,
          weighNlpTime: parameters.value.nlpSpeakingTime.weight,
          weightEqualParticipation: parameters.value.nlpEqualParticipation.weight
        };
        // alert(JSON.stringify(teamScoreDTO))

        const response = await axios.post('/score/team/' + team_id, teamScoreDTO);

        if (response.data && response.data.success) {
          // 这里处理成功的逻辑，比如提示用户提交成功
          console.log("Submission successful:", response.data);
          // setTimeout(()=>{
            emit('update', true)
          // },3000)

        } else {
          // 这里处理失败的逻辑，比如提示用户提交失败
          console.error("Submission failed:", response.data);
        }
      } catch (error) {
        // 这里处理网络错误或其他未预期的错误
        console.error("An error occurred during submission:", error);
      }
  }
}

async function submit(){
  try {
        emit('loading', true)
        const teamScoreDTO = {
          coefficientBody: parameters.value.body.value,
          coefficientBehaviour: parameters.value.behavior.value,
          coefficientTotal: parameters.value.total.value,
          weightBody: parameters.value.body.weight,
          weightBehaviour: parameters.value.behavior.weight,
          weighNlpTime: parameters.value.nlpSpeakingTime.weight,
          weightEqualParticipation: parameters.value.nlpEqualParticipation.weight
        };
        // alert(JSON.stringify(teamScoreDTO))

        const response = await axios.post('/score/team/' + props.teamid, teamScoreDTO);

        if (response.data && response.data.success) {
          // 这里处理成功的逻辑，比如提示用户提交成功
          console.log("Submission successful:", response.data);
          // setTimeout(()=>{
            emit('update', true)
          // },3000)

        } else {
          // 这里处理失败的逻辑，比如提示用户提交失败
          console.error("Submission failed:", response.data);
        }
      } catch (error) {
        // 这里处理网络错误或其他未预期的错误
        console.error("An error occurred during submission:", error);
      }
}
</script>

<template>
  <div class="con">
    <table class="table-style">
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Nonlinear Para</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="parameter in parameters" :key="parameter.id">
          <td>{{ parameter.label }}</td>
          <td v-if="parameter.editableParam">
            <div class="range-container">
              <el-slider v-model="parameter.value" show-input :step="0.1" :min="parameter.min" :max="parameter.max"> </el-slider>
            </div>
          </td>
          <td v-else>
            <!-- {{ parameter.value.toFixed(1) }} -->
          </td>
          <td v-if="parameter.editableWeight">
            <div class="range-container">
              <el-slider v-model="parameter.weight" show-input :step="0.01" :min="parameter.minWeight" :max="parameter.maxWeight"> </el-slider>
            </div>
          </td>
          <td v-else>
            <el-button type="success" @click="submit()" style="background-color: #7EC050;">Submit</el-button>
            <el-button type="success" @click="submitall()" style="background-color: #7EC050;">SubmitAll</el-button>
            <!-- {{ parameter.weight.toFixed(2) }} -->
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>
.table-style {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table-style th, .table-style td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.table-style th {
  background-color: #f2f2f2;
}

.range-container {
  display: flex;
  align-items: center;
}

.range-input {
  margin: 0 10px;
}

.submit-button {
  margin-top: 20px;
  text-align: center;
}

.card {
  padding: 80px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: #fff;
  margin: 20px 0;
}
</style>