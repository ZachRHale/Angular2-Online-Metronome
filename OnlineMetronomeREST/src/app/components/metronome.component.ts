
import { Component, OnInit, Inject } from '@angular/core';
import { Measure } from '../models/measure';
import { MeasureService } from '../services/measures.service';
import { environment } from '../../environments/environment';



@Component({
    selector: 'metronome',
    moduleId: module.id,
    templateUrl: './metronome.html'
})


export class MetronomeComponent implements OnInit {
    constructor(private measureService: MeasureService) {}

    dragOperation: boolean = true;
    listMeasures:Array<Measure> = [new Measure(2,4),new Measure(4,4)];
    measures: Array<Measure> = [new Measure(2,4), new Measure(3,16)];
    
    audioContext: AudioContext;
    timerWorker: Worker;
    lookahead: number = 25;
    isPlaying: boolean = false;
    downBeat: AudioBuffer;
    otherBeat: AudioBuffer;


    ngOnInit(){
      
      this.audioContext = new AudioContext();
      this.loadSound(environment.downBeat, this.audioContext).then(response => {this.downBeat = response ;})
      this.loadSound(environment.otherBeat, this.audioContext).then(response => {this.otherBeat = response ;})

      this.timerWorker = new Worker(environment.metronomeworker);

      this.timerWorker.onmessage = function(e) {
        if (e.data == "tick") {
            console.log("tick!");
            //scheduler();
        }
        else
            if(!environment.production){
              console.log("message: " + e.data);
            } 
        }
        this.timerWorker.postMessage({"interval":this.lookahead})
    }


    loadSound(filePath: string, context: AudioContext): Promise<AudioBuffer> {
      var request = new XMLHttpRequest();
      request.open('GET', filePath, true);
      request.responseType = 'arraybuffer';

      request.send();

      return new Promise((resolve) => {
        // Decode asynchronously
        request.onload = function() {
          context.decodeAudioData(request.response, function(buffer) {
            resolve(buffer);
          }, function(e){ console.log("Error with decoding audio data"); });
        }
    
     });
     
    }

    loadMeasures(user: string) {
      //Get all of the measures
      this.measureService.getMeasures(user).subscribe(
        measures => {
          this.measures = measures.map(measure => new Measure(measure.top, measure.bottom));
        },
        err => {
          console.log(err);
        }
      )
    }

    printStuff(): void {
        console.log(this.measures);
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) { // start playing  
            this.timerWorker.postMessage("start");
        } else {
            this.timerWorker.postMessage("stop");
    
        }
    }

    addMeasure(top:number, bottom:number): void {
      this.listMeasures.push(new Measure(Number(top), Number(bottom)));

    }

    playMeasureList(measureNumber: number, audioContext: AudioContext, timeworker: Worker, downBeat: AudioBuffer, otherBeat: AudioBuffer): void {

      // Add class name to make the measure a different color
      this.measures[measureNumber].isPlaying = "isPlaying";

      //Pass down the AudioContext and Worker to the measure list
      this.measures[measureNumber].play(measureNumber, audioContext, timeworker, downBeat, otherBeat).then(response =>
      {
        if(response > (this.measures.length - 1))
        { 
          this.measures[measureNumber].isPlaying = "";
          return 1;
        } else
        {
          this.playMeasureList(response, this.audioContext, this.timerWorker, this.downBeat, this.otherBeat);
        }
        // After we get the promise then make it a normal measure color
        this.measures[measureNumber].isPlaying = "";
      });
      
    }

    startPlaying(measureNumber: number){
      this.playMeasureList(measureNumber, this.audioContext, this.timerWorker, this.downBeat, this.otherBeat);
    }

    add($event: any){
      this.measures.push($event.dragData);
    }

}