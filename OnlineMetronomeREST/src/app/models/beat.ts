import { environment } from '../../environments/environment';

export class Beat {



    playBeat(time: number, buffer: AudioBuffer, context: AudioContext): void {
        var source = context.createBufferSource();
        source.buffer = buffer;

        source.connect(context.destination);
        source.start(time);
    }


}