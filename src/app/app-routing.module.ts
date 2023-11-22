import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloqueComponent } from './model/bloque/bloque/bloque.component'; 
import { CampusComponent } from './model/campus/campus/campus.component';
import { HomeComponent } from './home/home.component';
import { SedeComponent } from './model/sede/sede/sede.component';
import { CargoComponent } from './model/cargo/cargo/cargo.component';
import { CarnetComponent } from './model/carnet/carnet/carnet.component';
import { TipoDocumentoComponent } from './model/tipoDocumento/tipo-documento/tipo-documento.component';
import { ProgramaComponent } from './model/programa/programa/programa.component';
import { ContactoComponent } from './model/contacto/contacto/contacto.component';
import { RolComponent } from './model/rol/rol/rol.component';
import { EventoComponent } from './model/evento/evento/evento.component';
import { PersonaComponent } from './model/persona/persona/persona.component';

const routes: Routes = [
  {path:'',component: HomeComponent, pathMatch: 'full'},
  {path:'bloque', component: BloqueComponent},
  {path:'campus', component: CampusComponent},
  {path:'sede', component: SedeComponent},
  {path:'cargo', component: CargoComponent},
  {path:'carnet', component:CarnetComponent},
  {path:'tipo-documento', component: TipoDocumentoComponent},
  {path:'programa', component: ProgramaComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'rol', component:RolComponent},
  {path:'evento', component:EventoComponent},
  {path:'persona', component:PersonaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
