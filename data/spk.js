import csv from 'csv-parser'
import fs from 'fs'

const results = [];
let speakers = {}
let index = 0;
fs.createReadStream('result.txt')
  .pipe(csv({ separator: '\t' }))
  .on('data', (data) => {
    data.Start = data.Start*1000
    data.End = data.End*1000
    results.push(data)
    speakers[data['Speaker']] = true;
  })
  .on('end', () => {
    console.log(JSON.stringify({speakers:Object.keys(speakers),data:results}));
    
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });