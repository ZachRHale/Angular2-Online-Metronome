import { environment } from '../../environments/environment';
import { globalVars } from '../globalVars';

export class Measure {
    top: number;
    bottom: number;
    beats: Array<number> = [];
    tempo: number;
    isPlaying: string;
    beatsPerSecond: number;
    lookahead: number = environment.lookahead;
    scheduleAhead: number = 0.5;

    constructor(top:number, bottom:number, private globalVars: globalVars, beats?:Array<number>) {
        this.top = top;
        this.bottom = bottom;

        if (beats == undefined)
            for (var _i = 1; _i < (this.top + 1); _i++)
                this.beats.push(1)
        else 
            this.beats = beats

        if (top == 5 && bottom == 8)
            this.beats = [3, 1, 1];
    }

    play(measureNumber: number, audioContext: AudioContext, timeworker: Worker,downBeat: AudioBuffer, otherBeat: AudioBuffer, _globalVars: globalVars): Promise<number> {

        var counter = 0;
        var beats = this.beats;
        var bottom = this.bottom;
        var playSound = this.playSound;
        var nextNoteTime = 0;
        var lookahead = this.lookahead;
        var beatsPerSecond = this.beatsPerSecond;
        var scheduleAhead = this.scheduleAhead;
        _globalVars.globalTempo.subscribe(value => {beatsPerSecond = 60.0 / value;console.log(value)});

        return new Promise((resolve) => {

            timeworker.onmessage = function(e) {

                if (e.data == "tick"){
                    while (nextNoteTime < audioContext.currentTime + 0.1) {
                        if (counter == 0){
                            console.log(counter);
                            playSound(audioContext.currentTime + nextNoteTime, downBeat, audioContext, ((beatsPerSecond * 4.0/ bottom) * beats[counter]));
                        } else if (counter == beats.length - 1) {
                            var time = ((beatsPerSecond * 4.0/ bottom) * beats[counter])
                            console.log(counter);
                            var resolveSound = playSound(audioContext.currentTime + nextNoteTime, otherBeat, audioContext, time);
                            resolveSound.onended = function() {
                                setTimeout(function(){ resolve(measureNumber + 1) }, (time - resolveSound.buffer.duration) * 1000)
                            }
                        } else if (counter < beats.length){
                            console.log(counter);
                            playSound(audioContext.currentTime + nextNoteTime, otherBeat, audioContext, ((beatsPerSecond * 4.0/ bottom) * beats[counter]));       
                        }

                        if (counter >= beats.length){
                            nextNoteTime += ((beatsPerSecond * 4.0/ bottom))
                            counter++
                        } else {
                            nextNoteTime += ((beatsPerSecond * 4.0/ bottom) * beats[counter])
                            counter++
                        }
                    }
                }
                else 
                    console.log("message: " + e.data);
            }      
        });     
    }

  

    playSound(time: number, buffer: AudioBuffer, context: AudioContext, duration:number): AudioBufferSourceNode {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        console.log(time, duration)
        source.start(time, 0, duration);
        return source;
    }


    

}


