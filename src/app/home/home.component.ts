import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor(private router: Router){}

  goPersona(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/persona']);
  }

  goCampus(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/campus']);
  }

  goSede(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/sede']);
  }

  goCargo(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/cargo']);
  }

  goCarnet(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/carnet']);
  }
  goTipoDocumento(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/tipo-documento']);
  }
  goPrograma(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/programa']);
  }
  goContacto(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/contacto']);
  }
  goRol(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/rol']);
  }
  goEvento(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/evento']);
  }
  goBloque(){
    console.log("Se oprimio el boton");
    this.router.navigate(['/bloque']);
  }

}
