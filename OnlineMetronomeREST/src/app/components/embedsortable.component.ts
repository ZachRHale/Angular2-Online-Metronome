
import { Component } from '@angular/core';
import { Measure } from '../models/measure';
import { MeasureService } from '../services/measures.service';

@Component({
    selector: 'embedded-sortable',
    template: `
    <h1>Angular 4 Javascript Metronome</h1>
    <div class="row">        
        <button class="btn btn-default" (click)="playMeasureList(0)">Play All Measures</button>
        <button class="btn btn-default" (click)="printStuff()">Print the list</button>
      </div>
      <div class="row">
      <div class="col-md-4">
      <div class="form-group add-measures">
        <input class="form-control input-lg" type="number" #topNumber />
        <input class="form-control input-lg" type="number" #bottomNumber />
        <button class="btn btn-default btn-lg" (click)="addMeasure(topNumber.value, bottomNumber.value)">Add Measure</button>
      </div>
      <div class="panel panel-warning">
        <div class="panel-heading">
            <h3>Available measures</h3>
        </div>
        <div class="panel-body" dnd-sortable-container [sortableData]="listMeasures" [dropZones]="['boxers-zone']">
          <ul class="list-group" >
            <li *ngFor="let item of listMeasures; let i = index" class="list-group-item" [dragEnabled]="true" [dragData]="item" dnd-sortable [sortableIndex]="i">{{item.top}} / {{item.bottom}}</li>           
          </ul>
        </div>
      </div>
      </div>
      <div class="col-md-8">
      <div class="form-group load-measures">
        <button class="btn btn-default btn-lg" (click)="loadMeasures(HTTPAddress.value)">Load Measures</button>
        <input class="form-control input-lg" #HTTPAddress />
      </div>
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3>The Piece</h3>
          </div>
          <div class="panel-body" dnd-droppable (onDropSuccess)="add($event)" [dropZones]="['boxers-zone']" >
          <div dnd-sortable-container [sortableData]="measures">
            <div class="list-group">
              <div *ngFor="let item of measures; let i = index" dnd-sortable [sortableIndex]="i" class="list-group-item">{{item.top}} / {{item.bottom}}</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`
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