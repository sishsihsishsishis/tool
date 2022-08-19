import hand from "../assets/hand.svg";
import Heart from "../assets/heart.svg";
import Brain from "../assets/Brain.svg";

import { RingChart } from "./template/ringchart";
export async  function brain() {
    return RingChart(0,'Brain','#C79459',Brain)
}
export async function heart() {
    return RingChart(48,'Body','#772927',Heart)
}
export async function behavior() {
    return RingChart(71,'Behavior','#99B571',hand)
}
// export default {
//     series: [
//         {
//             type: 'gauge',
//             startAngle: 90,
//             endAngle: -270,
//             pointer: {
//                 show: false
//             },
//             progress: {
//                 show: true,
//                 overlap: false,
//                 // roundCap: true,
//                 clip: false,
//                 itemStyle: {
//                     color: '#99B571'
//                     // borderWidth: 1,
//                     // borderColor: '#464646'
//                 }
//             },
//             axisLine: {
//                 lineStyle: {
//                     width: 20
//                 }
//             },
//             splitLine: {
//                 show: false,
//                 distance: 0,
//                 length: 10
//             },
//             axisTick: {
//                 show: false
//             },
//             axisLabel: {
//                 show: false,
//                 distance: 50
//             },
//             data: [
//                 {
//                     value: 76,
//                     // name: 'Brain',
//                     title: {
//                         // offsetCenter: ['0%', '-30%']
//                     },
//                     detail: {
//                         valueAnimation: true,
//                         // offsetCenter: ['0%', '-20%']
//                     }
//                 }
//             ],
//             title: {
//                 fontSize: 14
//             },
//             detail: {
//                 offsetCenter: [0, -10],
//                 formatter: '{logo|}\n {value|{value}}{a|%}\n{b|Behavior}',
//                 rich: {
//                     logo: {
//                         // 这样设定 backgroundColor 就可以是图片了。
//                         backgroundColor: {
//                             //   image: './assets/Brain.svg'
//                             image: svg
//                         },
//                         // 可以只指定图片的高度，从而图片的宽度根据图片的长宽比自动得到。
//                         height: 25,
//                         lineHeight: 60
//                     },
//                     value: {
//                         color: 'black',
//                         fontSize: 64,
//                         fontWeight: 600,
//                     },
//                     a: {
//                         fontWeight: 600,
//                         lineHeight: 50,
//                         verticalAlign: 'bottom',
//                         color: 'black',
//                         fontSize: 25,
//                     },
//                     b: {
//                         fontWeight: 600,
//                         color: 'black',
//                         fontSize: 24,
//                         lineHeight: 40

//                     }
//                 }
//             },

//         }
//     ]
// };