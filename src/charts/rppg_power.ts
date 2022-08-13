import data from '../../data/rppg_power/power.json'
import { LineChart } from "./template/linechart";
/**
 * rppg_power
 */

function chunk(arr: Array<any>, len: number) {
  const ArrayList = []
  let index = 0
  while (index < arr.length) {
    ArrayList.push(arr.slice(index, index += len))
  }
  return ArrayList;
}

const average = (arr: Array<any>) => arr.reduce((a, b) => a + b) / arr.length;
let smoothParam = 100
for (let k in data) {
  let t = data[k];
  data[k] = chunk(t, smoothParam * 25).map((e, index) => {
    return [index * smoothParam, average(e.map(x => parseFloat(x[1])))]
  })
}
//---------
delete data.time;

export default async function () {

  return LineChart(data, {
    yAxis: {
      max: function (value: any) {
        return Math.floor(value.max * 100 + 1) / 100;
      }
    }
  })
}