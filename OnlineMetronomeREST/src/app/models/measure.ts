import { environment } from '../../environments/environment';
import { globalVars } from '../globalVars';

export class Measure {
    topNumber: number;
    bottomNumber: number;
    beats: Array<number> = [];
    tempo: number;
    isPlaying: string;
    beatsPerSecond: number;
    lookahead: number = environment.lookahead;
    scheduleAhead: number = 0.5;

    constructor(top:number, bottom:number, private globalVars: globalVars, beats?:Array<number>) {
        this.topNumber = top;
        this.bottomNumber = bottom;

        if (beats == undefined)
            for (var _i = 1; _i < (this.topNumber + 1); _i++)
                this.beats.push(1)
        else 
            this.beats = beats

        if (top == 5 && bottom == 8)
            this.beats = [3, 1, 1];
    }

    play(measureNumber: number, audioContext: AudioContext, timeworker: Worker,downBeat: AudioBuffer, otherBeat: AudioBuffer, _globalVars: globalVars): Promise<number> {

        var counter = 0;
        var beats = this.beats;
        var bottom = this.bottomNumber;
        var playSound = this.playSound;
        var nextNoteTime = audioContext.currentTime;
        var lookahead = this.lookahead;
        var beatsPerSecond = this.beatsPerSecond;
        var scheduleAhead = this.scheduleAhead;
        

        return new Promise((resolve) => {

            timeworker.onmessage = function(e) {
                _globalVars.globalTempo.subscribe(value => {beatsPerSecond = 60.0 / value;});
                if (e.data == "tick"){
                    if (nextNoteTime <= audioContext.currentTime + 0.1) {
                        if (counter == 0){

                            playSound(nextNoteTime, downBeat, audioContext, ((beatsPerSecond * 4.0/ bottom) * beats[counter]));
                            nextNoteTime += ((beatsPerSecond * 4.0/ bottom) * beats[counter])
                            console.log(beatsPerSecond)
                        } else if (counter == beats.length - 1) {
                            var time = ((beatsPerSecond * 4.0/ bottom) * beats[counter])

                            var resolveSound = playSound(nextNoteTime, otherBeat, audioContext, time);
                            resolveSound.onended = function() {
                                setTimeout(function(){ resolve(measureNumber + 1) }, (time - resolveSound.buffer.duration) * 1000)
                            }
                        } else if (counter < beats.length){
                            playSound(nextNoteTime, otherBeat, audioContext, ((beatsPerSecond * 4.0/ bottom) * beats[counter]));   
                            nextNoteTime += ((beatsPerSecond * 4.0/ bottom) * beats[counter])   
                            console.log(beatsPerSecond)
                        }

                        if (counter >= beats.length){
                            counter++
                        } else {
                            
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
        source.start(time, 0, duration);
        return source;
    }


    

}


