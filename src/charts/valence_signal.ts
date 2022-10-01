import { EChartOption } from 'echarts'
import data from '../../data/do/valence_signal/v2.json'
import sync from '../../data/do/valence_signal/valence_sync.json'
import { LineChart } from "./template/linechart";

export default async function () {
  return LineChart(data,'behavior')
}

export async function valence_signal_syn () {
  return LineChart(sync,'behavior')
}
