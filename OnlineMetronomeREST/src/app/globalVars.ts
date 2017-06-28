import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable() 
export class globalVars {
// use this property for property binding
  public globalTempo:BehaviorSubject<number> = new BehaviorSubject<number>(95);

  setTempo(tempo){
   this.globalTempo.next(tempo);
  }
}