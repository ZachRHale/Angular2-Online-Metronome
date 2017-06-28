import { NgModule }      from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { MeasureService } from './services/measures.service';
import { globalVars } from './globalVars';

import { MetronomeComponent }  from './components/metronome.component';
import { AppComponent } from './components/app.component';

import { DndModule } from 'ng2-dnd';
import { DbclickDirective } from './dbclick.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, DndModule.forRoot() ],
  declarations: [ AppComponent, MetronomeComponent, DbclickDirective ],
  providers: [ MeasureService, globalVars ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
