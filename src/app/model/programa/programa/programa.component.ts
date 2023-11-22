import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Programa } from '../model/Programa';
import { ProgramaService } from '../service/programa.service';
import Swal from 'sweetalert2'
import { Campus } from '../../campus/model/Campus';
import { Sede } from '../../sede/model/Sede';
import { Bloque } from '../../bloque/model/Bloque';
import { CampusService } from '../../campus/service/campus.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss']
})
export class ProgramaComponent implements OnInit{
  programas: Programa[] = [];
  campuses: Campus[] = [];
  programa: Programa = new Programa("","", new Campus("","",new Sede("","","",new Bloque("",0))));
  visibleDialogNewPrograma: boolean = false;
  visibleDialogViewPrograma: boolean = false;
  visibleDialogEditPrograma: boolean = false;

  constructor(private campusService: CampusService,private programaService: ProgramaService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarProgramas();
    this.cargarProgramas();
    this.cargarCampuses();
    this.cargarCampuses();
    this.programa = new Programa("","", new Campus("","",new Sede("","","",new Bloque("",0))));
  }

  cargarProgramas() {
    this.programaService.programas$.subscribe(programas => {
      this.programas = programas;
    });
    this.programaService.cargarProgramas();
  }

  cargarCampuses() {
    this.campusService.campuses$.subscribe(campuses => {
      this.campuses = campuses;
    });
    this.campusService.cargarCampuses();
  }

  agregarPrograma() {
    try {
      this.programaService.agregarPrograma(this.programa);
      this.visibleDialogNewPrograma = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Programa guardado con exito",
        showConfirmButton: false,
        timer: 1500
      });
      this.refresh();
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro agregar",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  functionUpdate() {
    try {
      if (this.programa.id != undefined) {
        this.programaService.actualizarPrograma(this.programa.id, this.programa);
        this.visibleDialogEditPrograma = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Programa actualizado con exito",
          showConfirmButton: false,
          timer: 1500
        });
        this.refresh();
      }
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro actualizar",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  actualizarPrograma(id: string) {
    try {
      this.visibleDialogEditPrograma = true;
      this.programa = new Programa("","", new Campus("","",new Sede("","","",new Bloque("",0))));
      this.programaService.obtenerProgramaPorId(id)
        .subscribe(
          programa => {
            this.programa = programa;
            this.programa.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el programa",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarPrograma(id: string) {
    Swal.fire({
      title: "Estas seguro?",
      text: "Este proceso no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.programaService.eliminarPrograma(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Programa eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerProgramaPorId(id: string) {
    try {
      this.programa = new Programa("","", new Campus("","",new Sede("","","",new Bloque("",0))));
      this.visibleDialogViewPrograma = true;
      this.programaService.obtenerProgramaPorId(id)
        .subscribe(
          programa => {
            this.programa = programa;
            this.programa.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el programa",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewPrograma() {
    this.visibleDialogNewPrograma = true;
  }
}
