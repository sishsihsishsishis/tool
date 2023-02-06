<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'


// type EChartsOptionFunc = () => 
const props = defineProps<{ opt: echarts.EChartsOption | Function | Promise<echarts.EChartsOption>, height?: number, width?: number }>()

let chartDiv = ref<HTMLDivElement>();
let options:Promise<echarts.EChartsOption> = props.opt instanceof Promise ? props.opt : props.opt instanceof Function ? (props.opt as Function)()  : ((async():Promise<echarts.EChartsOption>=>props.opt as echarts.EChartsOption)())
onMounted(async () => {
  let myChart = echarts.init(chartDiv.value!, undefined, { height: props.height!, width: props.width! });
  myChart.setOption<echarts.EChartsOption>(await options);
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
