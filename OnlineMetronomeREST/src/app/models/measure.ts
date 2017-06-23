import { environment } from '../../environments/environment';
import { globalVars } from '../globalVars';

export class Measure {
    top: number;
    bottom: number;
    beats: Array<number> = [];
    tempo: number;
    isPlaying: string;
    beatsPerSecond: number;

    constructor(top:number, bottom:number, private globalVars: globalVars, beats?:Array<number>) {
        this.top = top;
        this.bottom = bottom;
        globalVars.globalTempo.subscribe(value => {this.tempo = value; this.beatsPerSecond = 60.0 / value ;console.log(value)});

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
        var beats = this.beats.length;
        var bottom = this.bottom;
        var playSound = this.playSound;
        var nextNoteTime = 0;

        return new Promise((resolve) => {

            timeworker.onmessage = function(e) {
                if (e.data == "tick"){
                    
                }
                else 
                    console.log("message: " + e.data);
            }
            
            this.beats.forEach((element, index) => {
                if (index == 0)
                    playSound(audioContext.currentTime + nextNoteTime, downBeat, audioContext);
                else 
                    playSound(audioContext.currentTime + nextNoteTime, otherBeat, audioContext);

                nextNoteTime += ((this.beatsPerSecond * 4)/bottom) * element
            }); 
            //setTimeout(function(){resolve(measureNumber + 1)}, nextNoteTime * 1000)
        });     
    }


    playSound(time: number, buffer: AudioBuffer, context: AudioContext): void {
        var source = context.createBufferSource();
        source.buffer = buffer;

        source.connect(context.destination);
        source.start(time);
    }


    

}


