import data from '../../data/rppg_power/power.json'
import sync from '../../data/rppg_power/rppg_sync_smooth.json'
import { chunk, average,transTime } from "../utils";
import { LineChart } from "./template/linechart";
import { startTime } from "./template/time";

/**
 * rppg_power
 */


let smoothParam = 100
for (let k in data) {
  let t = data[k];
  data[k] = chunk(t, smoothParam * 25).map((e, index) => {
    return transTime(startTime,[index * smoothParam, average(e.map(x => parseFloat(x[1])))])
  })
}

// for (let k in sync) {
//   let t = sync[k];
//   sync[k] = chunk(t, smoothParam * 100 / 3).map((e, index) => {
//     return [index * smoothParam, average(e.map(x => parseFloat(x[1])))]
//   })
// }
for(let i in sync.rppg_sync){
  sync.rppg_sync[i][0] = startTime + sync.rppg_sync[i][0] * 1000 
}
let sync_data = {
  Synchrony:sync.rppg_sync
}
//---------
delete data.time;

export default async function () {

  return LineChart(data,'rppg', {
    yAxis: {
      max: function (value: any) {
        return Math.floor(value.max * 100 + 1) / 100;
      }
    }
  })
}

export async function rppg_sync () {
  return LineChart(sync_data,'rppg',{
    yAxis: {
      max: function (value: any) {
        return Math.floor(value.max * 100 + 1) / 100;
      }
    }
  })
}