import csv from 'csv-parser'
import fs from 'fs'
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
fs.createReadStream('power.csv')
  .pipe(csv())
  .on('data', (data) => {
    for(let k in data)
        if(results[k]==undefined){
            results[k] = []
            results[k].push([index,data[k]])
        }else results[k].push([index,data[k]])
    index++;
  })
  .on('end', () => {
    console.log(JSON.stringify(results));
  });