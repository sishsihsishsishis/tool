import data from '../../data/do/rppg_signal/mav.json'
import { LineChart } from "./template/linechart";

export default async function () {

  return LineChart(data,'rppg',false)
}
