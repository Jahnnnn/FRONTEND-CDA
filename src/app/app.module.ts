import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';

//Modulos de la aplicacion
import { HomeComponent } from './home/home.component';
import { SplitterModule } from 'primeng/splitter';
import { BloqueModule } from './model/bloque/bloque.module';
import { CampusModule } from './model/campus/campus.module';
import { SedeModule } from './model/sede/sede.module';
import { CargoModule } from './model/cargo/cargo.module';
import { CarnetModule } from './model/carnet/carnet.module';
import { TipoDocumentoModule } from './model/tipoDocumento/tipo-documento.module';
import { ProgramaModule } from './model/programa/programa.module';
import { ContactoModule } from './model/contacto/contacto.module';
import { RolModule } from './model/rol/rol.module';
import { EventoModule } from './model/evento/evento.module';
import { PersonaModule } from './model/persona/persona.module';
//

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BloqueModule,
    CampusModule,
    SedeModule,
    CargoModule,
    CarnetModule,
    TipoDocumentoModule,
    ProgramaModule,
    ContactoModule,
    RolModule,
    EventoModule,
    PersonaModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    RadioButtonModule,
    RatingModule,
    ToolbarModule,
    CardModule,
    SplitterModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }