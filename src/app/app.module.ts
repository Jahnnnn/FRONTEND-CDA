import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * Modulos de la aplicación
 */
import { RegistroModule } from './registro/registro.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PreRegistroModule} from './pre-registro/pre-registro.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegistroModule,
    UsuariosModule,
    PreRegistroModule,
    AutenticacionModule,
    ConfiguracionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
