import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatesListComponent } from './car.plates.list/plates.list.component';
import { PlatesEditComponent } from './car.plates.edit/plates.edit.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlatesListComponent, PlatesEditComponent],
  exports: [PlatesListComponent, PlatesEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CarPlatesModule { }
