import csv from 'csv-parser'
import fs from 'fs'

const results = [];
let speakers = {}
let Emotion = {}
let DialogueAct = {}
let sum = 0
const args = process.argv.slice(2);
fs.createReadStream(args[0])
  .pipe(csv({ separator: '\t' }))
  .on('data', (data) => {
    data['Start'] = parseInt(data['Start'] * 1000)
    data['End'] = parseInt(data['End'] * 1000)
    results.push(data)
    speakers[data['Speaker']] = (speakers[data['Speaker']] ?? 0)+data['End']-data['Start'];
    sum+=data['End']-data['Start'];
    Emotion[data['Emotion']] = true;
    DialogueAct[data['DialogueAct']] = true;
  })
  .on('end', () => {
    Object.keys(speakers).forEach(k=>{speakers[k] = ((speakers[k]/sum)*100).toFixed(2)})
    console.log(JSON.stringify({speakers,Emotion:Object.keys(Emotion),DialogueAct:Object.keys(DialogueAct),data:results}));
  });