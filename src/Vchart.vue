<script setup lang="ts">
import { ref, onMounted, inject, Ref, watchEffect} from 'vue'
import * as echarts from 'echarts'
import { getEmitter } from "./mitt";

let video = ref();
const startTime = inject<Ref<Date>>('startTime',ref(new Date()))


const props = defineProps<{ opt: Object | Function, height?: number, width?: number, type?: string }>()

let chartDiv = ref<HTMLDivElement>();
let options = props.opt instanceof Function ? props.opt() : ((async () => props.opt)())
let myChart: any;
onMounted(async () => {
  myChart = echarts.init(chartDiv.value!, undefined, { height: props.height!, width: props.width! });
  myChart.setOption({
    animationDuration:0,
  })
  try {
    myChart.setOption(await options);
  } catch (e) { console.log(e) }
  if (props.type === 'gantt') myChart.setOption({
    tooltip: {
      trigger: 'axis',
      triggerOn: 'click',
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: function (value: number, index: number) {
          return echarts.time.format(startTime.value.getTime() + value, '{HH}:{mm}', false);
        }
      },
      axisPointer: {
        value: 0,
        label: {
          show: true,
          formatter: function (params: any) {
            return echarts.time.format(startTime.value.getTime() + params.value, '{HH}:{mm}:{ss}', false);
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
  else if (props.type != 'ellipse') myChart.setOption({
    tooltip: {
      trigger: 'axis',
      triggerOn: 'click',
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: function (value: number, index: number) {
          return echarts.time.format(startTime.value.getTime() + value, '{HH}:{mm}', false);
        }
      },
      axisPointer: {
        value: 0,
        label: {
          show: true,
          formatter: function (params: any) {
            return echarts.time.format(startTime.value.getTime() + params.value, '{HH}:{mm}:{ss}', false);
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

  watchEffect(()=>{
    if (props.type === 'gantt') myChart.setOption({
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: function (value: number, index: number) {
            return echarts.time.format(startTime.value.getTime() + value, '{HH}:{mm}', false);
          }
        },
      }
    });
    else if (props.type != 'ellipse') myChart.setOption({
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: function (value: number, index: number) {
            return echarts.time.format(startTime.value.getTime() + value, '{HH}:{mm}', false);
          }
        },
      }
    });
  })
  if (props.type == 'gantt') {
      let ev = ['click','dblclick','mousedown','mousemove','mouseup','mouseover','mouseout','globalout','contextmenu','highlight','downplay','selectchanged','axisareaselected',];
      myChart.on('highlight', async function (params:any) {
          // console.log(params);
          if(params.batch!==undefined){
            let t1 = ((await options).series[params.batch[0]?.seriesIndex].data[params.batch[0]?.dataIndex])[1]
            let t2 = ((await options).series[params.batch[0]?.seriesIndex].data[params.batch[0]?.dataIndex])[2]
            // console.log(t)
            // getEmitter().emit('chart_time_update', (t2/2-t1/2+t1) / 1000)
            getEmitter().emit('chart_time_update', (t1) / 1000)
          }
      })
      getEmitter().on('video_time_update', (i: number) => {
        echartsUpdata(i)
      })
  } else if (props.type == 'ellipse') {
    getEmitter().on('video_time_update', async (time: number) => {
      myChart.dispatchAction({
        type: 'timelineChange',
        // 时间点的 index
        currentIndex: time
      })
    })
  }
  else {
    myChart.on('highlight', async (params: any) => {
      // console.log(params)
      if (params.escapeConnect == true) {
        let t = ((await options).series[params.batch[0]?.seriesIndex].data[params.batch[0]?.dataIndex])[0]
        getEmitter().emit('chart_time_update', (t) / 1000)
      }
    })
    getEmitter().on('video_time_update', (i: number) => {
      echartsUpdata(i)
    })
  }

 

  myChart.on('legendselectchanged', async (params: any) => {
    // console.log(params)
  })
  getEmitter().on('legendUnSelect', (user: string | string[]) => {
    // console.log(user)
    if (user instanceof Array)
      user.forEach(e => myChart.dispatchAction({
        type: 'legendUnSelect',
        // 图例名称
        name: e
      }))
    else myChart.dispatchAction({
      type: 'legendUnSelect',
      // 图例名称
      name: user
    })
  })
  getEmitter().on('legendHighlight', () => {

    myChart.dispatchAction({
      type: 'legendUnSelect'
    })
  })
  getEmitter().on('legendAllSelect', (user: string) => {
    myChart.dispatchAction({
      type: 'legendAllSelect',
    })
  })

});

function echartsUpdata(value: number) {
  myChart.setOption({
    xAxis: {
      axisPointer: {
        value: value * 1000,
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
