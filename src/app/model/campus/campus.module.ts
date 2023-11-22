import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';


//Componentes del modulo
import { CampusComponent } from './campus/campus.component';
//

@NgModule({
  declarations: [CampusComponent],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DialogModule,
    FormsModule,
    SplitterModule,
    DropdownModule
  ]
})
export class CampusModule { }
