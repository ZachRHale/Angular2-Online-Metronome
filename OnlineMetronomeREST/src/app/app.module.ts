import { NgModule }      from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { MeasureService } from './services/measures.service';

import { EmbeddedSortableComponent }  from './components/embedsortable.component';

import { DndModule } from 'ng2-dnd';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, DndModule.forRoot() ],
  declarations: [ EmbeddedSortableComponent ],
  providers: [ MeasureService ],
  bootstrap:    [ EmbeddedSortableComponent ]
})
export class AppModule { }
