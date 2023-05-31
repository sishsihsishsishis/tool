import mitt, { Emitter } from 'mitt'
type Events = {
    video_time_update: number;
    chart_time_update: number;
    legendSelect: string;
    legendAllSelect:string;
    legendUnSelect: string|string[];
    legendInverseSelect: string;
    legendHighlight: string;
    video_pause:string,
    video_play:string,
};

let emitter:Emitter<Events> = mitt<Events>();

export function getEmitter() {
    return emitter;
}