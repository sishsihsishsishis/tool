import data from '../../data/do/arousal_signal/a2.json'
import sync from '../../data/do/arousal_signal/arousal_sync_new.json'
import { LineChart } from "./template/linechart";

export default async function () {

  return LineChart(data,'behavior',false)
}
export async function arousal_signal_syn () {
  return LineChart(sync,'behavior',true)
}