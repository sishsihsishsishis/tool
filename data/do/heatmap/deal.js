import csv from 'csv-parser'
import fs from 'fs'
import { startTime } from '../time.js'
function chunk(arr,len){
    const ArrayList = [] 
    let index = 0 
    while (index < arr.length) { 
        ArrayList.push(arr.slice(index, index += len)) 
    }
    return ArrayList;
}
const results = {};
let index = 0;
// const args = process.argv.slice(2);

function deal(file){
  return new Promise(reslove=>{
    let results = [];
    fs.createReadStream(file)
  .pipe(csv())
  .on('data', (data) => {
    // console.log(parseFloat(data['v_mean']),(parseFloat(data['0_v'])+parseFloat(data['1_v'])+parseFloat(data['2_v'])+parseFloat(data['3_v'])+parseFloat(data['4_v'])+parseFloat(data['5_v']))/6)
    results.push([
      startTime + index++,
      [data['v_mean'],data['a_mean'],data['v_std'],data['a_std']],
      [data['00_v'],data['00_a'],0,0],
      [data['01_v'],data['01_a'],0,0],
      [data['02_v'],data['02_a'],0,0],
      [data['10_v'],data['10_a'],0,0],
      [data['11_v'],data['11_a'],0,0],
      [data['12_v'],data['12_a'],0,0],
    ])
  })
  .on('end', () => {
    reslove(results)
  });
  })
}


// let user = ['00','01','02','10','11','12']
// let rs = user.map(u=>)
// Promise.all(rs).then(r => {
//   r.forEach(o=>results[o.user] = o.marks.slice(0,3))
//   console.log(JSON.stringify(results,null,2))
// })

deal('va_1102.csv').then(r=>console.log(JSON.stringify(r)))