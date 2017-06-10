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
export let test = class test {
    constructor() {
        this.listOne = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
    }
};
test = __decorate([
    Component({
        selector: 'test',
        template: `
<h4>Simple sortable</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">
                Favorite drinks
            </div>
            <div class="panel-body">
                <ul class="list-group" dnd-sortable-container [sortableData]="listOne">
                    <li *ngFor="let item of listOne; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-default">
            <div class="panel-body">
                My prefences:<br/>
                <span *ngFor="let item of listOne; let i = index">{{i + 1}}) {{item}}<br/></span>
            </div>
        </div>
    </div>
</div>`
    }), 
    __metadata('design:paramtypes', [])
], test);
class what {
    constructor() {
        this.listOne = "Strugg";
    }
}
//# sourceMappingURL=test.component.js.map