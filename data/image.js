const imageToRgbaMatrix = require('image-to-rgba-matrix');
imageToRgbaMatrix('./1 3.jpg').then(r=>{
// imageToRgbaMatrix('./2.png').then(r=>{
    let c = []
    r.forEach((e,indeX)=>{
        e.forEach((x,index)=>{
            kk = (x[0]+x[1]+x[2])/3
            if(kk!=0) c.push( [index,r.length-1-indeX,kk] )
        })
    })
    console.log(JSON.stringify(c))
});

// imageToRgbaMatrix('./1.jpg').then(console.log)