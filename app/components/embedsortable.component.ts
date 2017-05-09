import { Component } from '@angular/core';
import { Measure } from '../models/measure';

@Component({
    selector: 'embedded-sortable',
    template: `
    <h4>Multi list sortable</h4>
    <div class="row">
        <button (click)="printStuff()">Print the list</button>
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
            <ul class="list-group">
              <li *ngFor="let item of measures; let i = index" dnd-sortable [sortableIndex]="i class="list-group-item">{{item.top}} / {{item.bottom}} <button (click)="item.play()">Click</button></li>
            </ul>
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

    add($event: any){
      this.measures.push($event.dragData);
    }
}




