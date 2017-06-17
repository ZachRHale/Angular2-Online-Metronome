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

    play(input: number): Promise<number> {

        var counter = 1;
        var beats = this.beats.length;
        var tempo = this.tempo;
        var bottom = this.bottom;
        var playSound = this.playSound;

        return new Promise((resolve) => {

        var looper = function(){  
            if (counter < (beats + 1)) {
                console.log(counter);
                playSound(counter);
                counter = counter + 1;
            } else {
                console.log('Loop end');
                //Make this point to the next measure in line
                resolve(input + 1);
                return 1;
                
            }   

            setTimeout(looper,((60/tempo) * 1000 * 4)/bottom );
        }
        looper();
        
     });
    }

    playSound(beat: number): void {
        var downBeat = new Audio(environment.downBeat);
        var otherBeat = new Audio(environment.otherBeat);
        if (beat == 1){
            downBeat.play();
        } else {
            otherBeat.play();
        }
        
    }
    

}


