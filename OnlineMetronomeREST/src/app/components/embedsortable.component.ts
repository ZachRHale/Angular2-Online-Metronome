
import { Component } from '@angular/core';
import { Measure } from '../models/measure';
import { MeasureService } from '../services/measures.service';

@Component({
    selector: 'embedded-sortable',
    moduleId: module.id,
    templateUrl: './embedsortable.html'
})


export class EmbeddedSortableComponent {
    constructor(private measureService: MeasureService) {}

    dragOperation: boolean = true;

    listMeasures:Array<Measure> = [new Measure(2,4),new Measure(4,4)];
    measures: Array<Measure> = [new Measure(2,4), new Measure(3,16)];

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
    }

    addMeasure(top:number, bottom:number): void {
      this.listMeasures.push(new Measure(Number(top), Number(bottom)));

    }

    playMeasureList(start: number): void {

      this.measures[start].play(start).then(response =>
      {
        if(response > (this.measures.length - 1))
        {
          return 1;
        } else
        {
          this.playMeasureList(response);
        }
      });
      
    }

    add($event: any){
      this.measures.push($event.dragData);
    }

}