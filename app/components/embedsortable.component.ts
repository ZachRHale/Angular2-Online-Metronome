
import { Component } from '@angular/core';
import { Measure } from '../models/measure';

@Component({
    selector: 'embedded-sortable',
    template: `
    <h4>Multi list sortable</h4>
    <div class="row">
        <input type="number" #topNumber />
        <input type="number" #bottomNumber />
        <button (click)="addMeasure(topNumber.value, bottomNumber.value)">Print the list</button>
        <button (click)="playMeasureList(0)">Play All Measures</button>
        <button (click)="printStuff()">Print the list</button>
      </div>
      <div class="row">
      <div class="col-md-4">
        <div class="panel panel-warning">
          <div class="panel-heading">
            Available measures
          </div>
          <div class="panel-body" dnd-sortable-container [sortableData]="listMeasures" [dropZones]="['boxers-zone']">
            <ul class="list-group" >
              <li *ngFor="let item of listMeasures; let i = index" class="list-group-item" [dragEnabled]="true" [dragData]="item" dnd-sortable [sortableIndex]="i">{{item.top}} / {{item.bottom}}</li>           
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="panel panel-info">
          <div class="panel-heading">
            Second Team
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
    dragOperation: boolean = true;

    listMeasures:Array<Measure> = [new Measure(2,4),new Measure(4,4)];
    measures: Array<Measure> = [new Measure(2,4), new Measure(3,16)];

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