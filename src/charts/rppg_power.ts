import data from '../../data/do/rppg_power/power.json'
import sync from '../../data/do/rppg_power/rppg_sync_new.json'
import { LineChart } from "./template/linechart";

export default async function () {

  return LineChart(data,'rppg',false, {
    yAxis: {
      max: function (value: any) {
        return Math.floor(value.max * 100 + 1) / 100;
      }
    },
  })
}

export async function rppg_sync () {
  return LineChart(sync,'rppg',true,{
    yAxis: {
      max: function (value: any) {
        return Math.floor(value.max * 100 + 1) / 100;
      }
    }
  })
}