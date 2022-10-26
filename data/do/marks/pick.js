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
const results = { "team" : [
  { "start": "1170", "end": "1200" },
  { "start": "1500", "end": "1530" },
  { "start": "2070", "end": "2100" },
]};
let index = 0;
// const args = process.argv.slice(2);

function deal(user){
  return new Promise(reslove=>{
    let results = [];
    fs.createReadStream(user+'.csv')
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      start:data.start,
      end:data.end,
      label:parseInt(`${data.hrv_label}${data.v_label}${data.a_label}`,2)
    })
  })
  .on('end', () => {
    reslove({user:user,marks:results})
  });
  })
}


let user = ['00','01','02','10','11','12']
let rs = user.map(u=>deal(u))
Promise.all(rs).then(r => {
  r.forEach(o=>results[o.user] = o.marks.slice(0,3).sort((a,b)=> a.start - b.start));
  console.log(JSON.stringify(results,null,2))
})
