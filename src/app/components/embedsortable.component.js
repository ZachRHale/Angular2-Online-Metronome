var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Measure } from '../models/measure';
import { MeasureService } from '../measures.service';
export let EmbeddedSortableComponent = class EmbeddedSortableComponent {
    constructor(measureService) {
        this.measureService = measureService;
        this.dragOperation = true;
        this.listMeasures = [new Measure(2, 4), new Measure(4, 4)];
        this.measures = [new Measure(2, 4), new Measure(3, 16)];
        this.measure = {};
    }
    loadMeasures() {
        this.measureService.getMeasures().subscribe(data => this.measure = data);
    }
    printStuff() {
        console.log(this.measures);
    }
    addMeasure(top, bottom) {
        this.listMeasures.push(new Measure(Number(top), Number(bottom)));
    }
    playMeasureList(start) {
        this.measures[start].play(start).then(response => {
            if (response > (this.measures.length - 1)) {
                return 1;
            }
            else {
                this.playMeasureList(response);
            }
        });
    }
    add($event) {
        this.measures.push($event.dragData);
    }
};
EmbeddedSortableComponent = __decorate([
    Component({
        selector: 'embedded-sortable',
        template: `
    <h4>Multi list sortable</h4>

  <div>
    <button (click)="loadMeasures()">Load Measures</button>
    {{ measure | json }}
  </div>
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
    }), 
    __metadata('design:paramtypes', [MeasureService])
], EmbeddedSortableComponent);
//# sourceMappingURL=embedsortable.component.js.map