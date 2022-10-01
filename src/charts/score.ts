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