import { EChartsOption } from 'echarts'

export function RingChart(data:number|null, color:string){
    const opt:EChartsOption = {
        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    overlap: false,
                    // roundCap: true,
                    clip: false,
                    itemStyle: {
                        // color: 'white'
                        color: color+'dd'
                        // borderWidth: 1,
                        // borderColor: '#464646'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 5,
                        color: [[1, '#ffffff40']]
                    }
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                },
                data: [
                    {
                        value: data ?? 0,
                        title: {
                        },
                        detail: {
                            valueAnimation: true,
                        }
                    }
                ],
                title: {
                    fontSize: 10
                },
                detail: {
                    offsetCenter: [0, 0],
                    formatter: data===null?`{valuenone|N/A}`: `{value|{value}}`,
                    rich: {
                        value: {
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 600,
                            fontFamily:'inter'
                        },
                        valuenone:{
                            color: '#ffffffa0',
                            fontSize: 10,
                            lineHeight:12,
                            fontWeight: 600,
                            fontFamily:'inter'
                        },
                    }
                },
            }
        ]
    };
    return opt as EChartsOption
}