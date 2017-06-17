import { NgModule }      from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { MeasureService } from './services/measures.service';

import { MetronomeComponent }  from './components/metronome.component';
import { AppComponent } from './components/app.component';

import { DndModule } from 'ng2-dnd';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, DndModule.forRoot() ],
  declarations: [ AppComponent, MetronomeComponent ],
  providers: [ MeasureService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
