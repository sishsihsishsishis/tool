import mitt, { Emitter } from 'mitt'
type Events = {
    video_time_update: number;
};

let emitter:Emitter<Events> = mitt<Events>();

export function getEmitter() {
    return emitter;
}