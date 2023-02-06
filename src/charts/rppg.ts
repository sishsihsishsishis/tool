import { LineChart } from "./template/linechart";
import axios from "axios";


export async function rppg_sync (meetingId:string,marks:Promise<any>) {
  let { data:sync }  = (await axios.get(`/csv/rsync?meetingID=${meetingId}`)).data
  return LineChart(sync,'rppg',true,await marks)
}

export async function rppg_signal(meetingId:string,marks:Promise<any>) {
  let { data:signal }  = (await axios.get(`/csv/rresult?meetingID=${meetingId}`)).data
  return LineChart(signal,'rppg',false,await marks)
}
