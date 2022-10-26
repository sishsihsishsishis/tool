<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps<{ opt: Object|Function, height?: number, width?: number }>()

let chartDiv = ref<HTMLDivElement>();
let options = props.opt instanceof Function ? props.opt() : ((async()=>props.opt)())
onMounted(async () => {
  let myChart = echarts.init(chartDiv.value!, undefined, { height: props.height!, width: props.width! });
  myChart.setOption(await options);
  window.onresize = function () {
    myChart.resize();
  };
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
