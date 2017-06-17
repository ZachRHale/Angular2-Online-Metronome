import { environment } from '../../environments/environment';

export class Measure {
    top: number;
    bottom: number;
    beats: Array<number> = [];
    tempo: number;
    isPlaying: string;

    constructor(top:number, bottom:number ) {
        this.top = top;
        this.bottom = bottom;
        this.tempo = 80;

        for (var _i = 1; _i < (this.top + 1); _i++) {
            this.beats.push(_i)
        }

    }

    play(measureNumber: number, audioContext: AudioContext, timeworker: Worker,downBeat: AudioBuffer, otherBeat: AudioBuffer): Promise<number> {

        var counter = 1;
        var beats = this.beats.length;
        var tempo = this.tempo;
        var bottom = this.bottom;
        var playSound = this.playSound;
        var nextNoteTime = 0;

        this.beats.forEach(element => {
            playSound(audioContext.currentTime + nextNoteTime, downBeat, audioContext);
            var beatsPerSecond = 60.0 / tempo;
            nextNoteTime += (beatsPerSecond * 4)/bottom
            console.log("hey!" + nextNoteTime + "--" + audioContext.currentTime);
        });


        return new Promise((resolve) => {

        var looper = function(){  
            if (counter < (beats + 1)) {
                console.log(counter);
                //playSound(counter);
                counter = counter + 1;
            } else {
                console.log('Loop end');
                //Make this point to the next measure in line
                resolve(measureNumber + 1);
                return 1;
                
            }   

            setTimeout(looper,((60/tempo) * 1000 * 4)/bottom );
        }
        looper();
        
     });
    }

    playSound(time: number, buffer: AudioBuffer, context: AudioContext): void {
        var source = context.createBufferSource();
        source.buffer = buffer;

        source.connect(context.destination);
        source.start(time);
    }
    

}


