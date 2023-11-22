import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { VisitanteComponent } from './visitante/visitante.component';



@NgModule({
  declarations: [
    ViewComponent,
    VisitanteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VisitanteModule { }
