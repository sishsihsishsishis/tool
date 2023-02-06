import { LineChart } from "./template/linechart";
import axios from "axios";

export default async function (meetingId:string,marks:Promise<any>) {
  let { data }  = (await axios.get(`/csv/aresult?meetingID=${meetingId}`)).data
  return LineChart(data,'behavior',false,await marks)
}
export async function arousal_signal_syn(meetingId:string,marks:Promise<any>) {
  let { data : sync }  = (await axios.get(`/csv/async?meetingID=${meetingId}`)).data
  return LineChart(sync,'behavior',true,await marks)
}