<script setup lang="ts">
import { ref, onMounted, Ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { RingChart } from "./charts/template/ringchart";

const props = defineProps<{ value: Ref<number|null>, color: string, height?: number, width?: number }>()

// export async function heart(val:number) {
//     return RingChart(val,'Body','#B73B4B',Heart)
// }
// export async function behavior(val:number) {
//     return RingChart(val,'Behavior','#9FC949',hand)
// }

let chartDiv = ref<HTMLDivElement>();
onMounted(async () => {
  let options = RingChart(props.value.value,props.color)
  let myChart = echarts.init(chartDiv.value!, undefined, { height: props.height!, width: props.width! });
  myChart.setOption<echarts.EChartsOption>(options);
  window.onresize = function () {
    myChart.resize();
  };
  watchEffect(()=>{
    myChart.setOption<echarts.EChartsOption>({series:[{data:[{value: props.value.value ?? 0}]}]});
  })
});


</script>

<template>
  <div ref="chartDiv" :class="{charts:props.width==undefined}"></div>
</template>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
  margin: auto;
}
</style>
