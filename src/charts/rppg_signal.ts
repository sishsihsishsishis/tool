import data from '../../data/do/rppg_signal/mav.json'
import { LineChart } from "./template/linechart";

export default async function () {

  return LineChart(data,'rppg', {
    yAxis: {
      max: function (value: any) {
        return Math.floor(value.max * 100 + 1) / 100;
      }
    }
  })
}
