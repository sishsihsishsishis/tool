import { EChartOption } from 'echarts'
import data from '../../data/do/valence_signal/v_1102.json'
import sync from '../../data/do/valence_signal/valence_sync_1102.json'
import { LineChart } from "./template/linechart";

export default async function () {
  return LineChart(data,'behavior',false)
}

export async function valence_signal_syn () {
  return LineChart(sync,'behavior',true)
}
