import hand from "../assets/hand.svg";
import Heart from "../assets/heart.svg";
import Brain from "../assets/Brain.svg";

import { RingChart } from "./template/ringchart";
export async  function brain() {
    return RingChart(0,'Brain','#C79459',Brain)
}
export async function heart() {
    return RingChart(48,'Body','#B73B4B',Heart)
}
export async function behavior() {
    return RingChart(71,'Behavior','#9FC949',hand)
}