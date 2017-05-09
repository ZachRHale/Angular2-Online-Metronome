import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { EmbeddedSortableComponent }  from './components/embedsortable.component';

import { DndModule } from 'ng2-dnd';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DndModule.forRoot() ],
  declarations: [ EmbeddedSortableComponent ],
  bootstrap:    [ EmbeddedSortableComponent ]
})
export class AppModule { }
