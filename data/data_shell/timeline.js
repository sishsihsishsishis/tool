import csv from 'csv-parser'
import fs from 'fs'

//  x    y   r_x r_y  // x,y 如果没数据默认填null r_x r_y没数据默认填0
// [null, null, 0, 0], //[v_mean, a_mean, v_std, a_std]
// [null, null, 0, 0], //[v_user00, a_user00, 0, 0] //user 都没有r_x r_y 都填0
// [null, null, 0, 0], //[v_user01, a_user01, 0, 0]
// [null, null, 0, 0]  //[v_user10, a_user10, 0, 0]

//  x    y   r_x r_y  // x,y 如果没数据默认填null r_x r_y没数据默认填0
// [v_mean,               a_mean,              v_std,                a_std              ]
// [-0.08290603666666667, 0.24438201387723288, 0.050390623656906976, 0.09717657104512724],
// [v_user**,   a_user**,          0,0]
// [-0.13428319,0.2419780343770981,0,0],
// [-0.03356358,0.148429736495018, 0,0],
// [-0.08087134,0.3427382707595825,0,0]
function comp(file_v,file_a){
  const idxMap = {
    v_mean:0,
    a_mean:1,
    v_std:2,
    a_std:3,
    v:0,
    a:1.
  }
  const results = [];
  const timeline = [];
  let userList = [];
  let index_v = 0;
  let index_a = 0;
  function deal_v(){
    return new Promise(reslove=>{
      fs.createReadStream(file_v)
        .pipe(csv())
        .on('data', (data) => {
          if(userList.length === 0) userList = Object.keys(data).filter(e=>e.includes('user'))
          
          if(results.length < index_v +1){
            timeline.push(parseInt(data['time_s']) * 1000)

            results.push([
              [0,0,0,0],
              ...userList.map(e=>[0,0,0,0]),
          ])
          }
          results[index_v][0][idxMap['v_mean']] = parseFloat(data['v_mean'])
          results[index_v][0][idxMap['v_std']] = parseFloat(data['v_std']==="" ? 0 : data['v_std'])
          userList.forEach((val,i)=>{
            results[index_v][i+1][idxMap['v']] = parseFloat(data[val])
          })
          index_v++;
    })
    .on('end', () => {
      reslove()
    });
    })
  }
  function deal_a(){
    return new Promise(reslove=>{
      fs.createReadStream(file_a)
        .pipe(csv())
        .on('data', (data) => {
          if(userList.length === 0) userList = Object.keys(data).filter(e=>e.includes('user'))
          
          if(results.length < index_a +1){
            timeline.push(parseInt(data['time_s']) * 1000)

            results.push([
              [0,0,0,0],
              ...userList.map(e=>[0,0,0,0]),
          ])
          }
          results[index_a][0][idxMap['a_mean']] = parseFloat(data['a_mean'])
          results[index_a][0][idxMap['a_std']] = parseFloat(data['a_std']==="" ? 0 : data['a_std'])
          userList.forEach((val,i)=>{
            results[index_a][i+1][idxMap['a']] = parseFloat(data[val])
          })
          index_a++;
    })
    .on('end', () => {
      reslove()
    });
    })
  }
  Promise.all([deal_v(),deal_a()]).then(()=>{
    console.log(JSON.stringify({
      timeline,
      userList,
      data:results,
    }))
  })
} 



const args = process.argv.slice(2);
comp(args[0],args[1])