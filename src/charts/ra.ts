import axios from 'axios';
import { EChartsOption, use } from 'echarts'
import color from "./template/color";

function linearInterpolator (arr,num){
  let dis = []
  let start,end,sp;
  let isArr = false;
  arr.forEach((e,index) => {
    if(index == 0) {
      dis.push(e)
      start = e
      if(start instanceof Array) isArr = true
    }
    else {
      end = e
      sp = isArr ? end.map((e,index)=>(end[index]-start[index]) / (num)) : (end - start) / (num)
      new Array(num).fill(0).forEach((e,index)=>{
        dis.push(isArr
          ? start.map((e,j)=>(e + sp[j] * (index+1)))
          : start + sp * (index+1)
        )
      })
      start = e
    }
  })
  return dis
}

export default async function ({time,distance}) {
  let Distance = await distance;
  let X = {}
  for(let u in Distance){
    X[u] = linearInterpolator(Distance[u],30)
  } 
  let Time = new Array(await time/1000).fill(0).map((e,index)=>index);
  let fx = (Distance[Object.keys(Distance)[0]][1][0]-Distance[Object.keys(Distance)[0]][0][0])/1000

  return {timeline:{
    type: 'number',
    data:Time,
    show:false,
  },
  title: {
  },
  legend: {
    data: Object.keys(Distance)
  },
  polar: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  angleAxis: {
    type: 'category',
    data: Object.keys(Distance)
  },
  radiusAxis: {
    max:2,
    axisLabel:{
      show:false
    },
    axisLine:{
      show:false
    },
    axisTick:{
      show:false
    }
  },

  animationDuration:0,
  animationDurationUpdate:1000,
  // animationEasing:'linear',
  animationEasingUpdate:'linear',
  options: Time.map((e,index)=>({ series: Object.keys(Distance).map(user=>(
    {
      coordinateSystem: 'polar',
      type: 'scatter',
      name: user,
      color:color[user],
      data: [[X[user][index]?.[1],user]],
      symbolSize:20
    }))
    }))
  }
}