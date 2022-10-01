<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { startTime } from "./charts/template/time";
import { getEmitter } from "./mitt";

let video = ref();
let d = []
for (let i = 0; i < 50 * 60; i++) {
  d.push(startTime + i * 1000)
}
const props = defineProps<{ opt: Object | Function, height?: number, width?: number, type?: string }>()

let chartDiv = ref<HTMLDivElement>();
let options = props.opt instanceof Function ? props.opt() : ((async () => props.opt)())
let myChart: any;
onMounted(async () => {
  myChart = echarts.init(chartDiv.value!, undefined, { height: props.height!, width: props.width! });
  myChart.setOption(await options);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      triggerOn: 'click',
    },
    xAxis: {
      type: 'time',
      axisPointer: {
        value: startTime,
        label: {
          show: true,
          formatter: function (params: any) {
            return echarts.format.formatTime('hh:mm:ss', params.value);
          },
          backgroundColor: '#7581BD',
          margin: 20
        },
        handle: {
          show: true,
          icon: 'path://M2,8 L5,2 L8,8 L 2,8',
          size: 15,
          margin: 10,
          color: '#7581BD'
        }
      }
    }
  });
  window.onresize = function () {
    myChart.resize();
  };
  // let ev = ['click','dblclick','mousedown','mousemove','mouseup','mouseover','mouseout','globalout','contextmenu','highlight','downplay','selectchanged','axisareaselected',]
  // ev.forEach(e=>myChart.on(e, function (params:any) {
  //     console.log(params);
  // }))
  if(props.type=='gantt'){

  }else{
    myChart.on('highlight', async (params: any) => {
    // console.log(await options)
    let t = ((await options).series[params.batch[0]?.seriesIndex].data[params.batch[0]?.dataIndex])[0]
    getEmitter().emit('chart_time_update', (t - startTime) / 1000)
  })
  }
  
  getEmitter().on('video_time_update', (i: number) => {
    echartsUpdata(i)
  })
});
function echartsUpdata(value: number) {
  myChart.setOption({
    xAxis: {
      axisPointer: {
        value: startTime + value * 1000,
      }
    }
  })
}
defineExpose({ echartsUpdata })
</script>

<template>
  <div ref="chartDiv" class="charts"></div>
</template>

<style scoped>
.charts {
  width: 100%;
  margin: auto;
}
</style>
