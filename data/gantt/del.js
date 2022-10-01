import fs from "fs";

let path = './new_speak_dialogueacts'
// let path = './new_speak_emotions'
const data = JSON.parse(fs.readFileSync(path+'.old.json'))

for (let i in data.data){
    let t = data.data[i]
    t['Start'] = new Date(t['Start']).getTime()//-12*60*60*1000
    t['Finish'] = new Date(t['Finish']).getTime()//-12*60*60*1000
}

fs.writeFileSync(path+'.json',JSON.stringify(data))
