import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campus } from '../model/Campus';
import { CampusService } from '../service/campus.service';
import { SedeService } from '../../sede/service/sede.service';
import Swal from 'sweetalert2'
import { Sede } from '../../sede/model/Sede';
import { Bloque } from '../../bloque/model/Bloque';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit {

  campuses: Campus[] = [];
  sedes: Sede[] = [];
  campus: Campus = new Campus("", "", new Sede("", "", "", new Bloque("", 0)));
  visibleDialogNewCampus: boolean = false;
  visibleDialogViewCampus: boolean = false;
  visibleDialogEditCampus: boolean = false;

  constructor(private campusService: CampusService, private sedeService: SedeService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarCampuses();
    this.cargarCampuses();
    this.cargarSedes();
    this.cargarSedes();
    this.campus = new Campus("", "", new Sede("", "", "", new Bloque("", 0)));
  }

  cargarCampuses() {
    this.campusService.campuses$.subscribe(campuses => {
      this.campuses = campuses;
    });
    this.campusService.cargarCampuses();
  }

  cargarSedes() {
    this.sedeService.sedes$.subscribe(sedes => {
      this.sedes = sedes;
    });
    this.sedeService.cargarSedes();
  }

  agregarCampus() {
    try {
      this.campusService.agregarCampus(this.campus);
      this.visibleDialogNewCampus = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Campus guardado con exito",
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
      if (this.campus.id != undefined) {
        this.campusService.actualizarCampus(this.campus.id, this.campus);
        this.visibleDialogEditCampus = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Campus actualizado con exito",
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

  actualizarCampus(id: string) {
    try {
      this.visibleDialogEditCampus = true;
      this.campus = new Campus("","", new Sede("","","", new Bloque("",0)));
      this.campusService.obtenerCampusPorId(id)
        .subscribe(
          campus => {
            this.campus = campus;
            this.campus.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el campus",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarCampus(id: string) {
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
        this.campusService.eliminarCampus(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Campus eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerCampusPorId(id: string) {
    try {
      this.campus = new Campus("", "", new Sede("", "", "", new Bloque("", 0)));
      this.visibleDialogViewCampus = true;
      this.campusService.obtenerCampusPorId(id)
        .subscribe(
          campus => {
            this.campus = campus;
            this.campus.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el campus",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewCampus() {
    this.visibleDialogNewCampus = true;
  }

}
