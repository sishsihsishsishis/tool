import fs from "fs";
import { DateFormat, chunk, average } from './util.js'

const args = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(args[0]))

/**
 * rppg_signal
 */
let smoothParam = parseInt(args[1] ?? 1)
// time的平滑处理，取第一个（防止数据x轴开始不为0） 假设smoothParam = 3 ：[0,1,2,3,4,5,...] => [[0,1,2],[3,4,5],...] => [0,3,...]
let time_s = chunk(data.time_s.map(e=>e[1]*1000), smoothParam).map(e=>e[0])
let res = {}
for(let k in data){
  if(k === 'time_s'){
    continue
  } else if(k.includes('std')) {
    continue
  } else {
    // 数据的平滑处理，取平均值 假设smoothParam = 3 ：[0,1,2,3,4,5,...] => [[0,1,2],[3,4,5],...] => [1,4,...]
    res[k] = chunk(data[k].map(e=>parseFloat(e[1])),smoothParam).map((v,index)=>[time_s[index],average(v.filter(e=>!isNaN(e)))])
  }
}
console.log(JSON.stringify(res))