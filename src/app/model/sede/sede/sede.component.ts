import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SedeService } from '../../sede/service/sede.service';
import { BloqueService } from '../../bloque/service/bloque.service';
import Swal from 'sweetalert2'
import { Sede } from '../../sede/model/Sede';
import { Bloque } from '../../bloque/model/Bloque';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})
export class SedeComponent implements OnInit{

  bloques: Bloque[] = [];
  sedes: Sede[] = [];
  sede: Sede = new Sede("","","", new Bloque("",0));
  visibleDialogNewSede: boolean = false;
  visibleDialogViewSede: boolean = false;
  visibleDialogEditSede: boolean = false;

  constructor(private bloqueService: BloqueService, private sedeService: SedeService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarSedes();
    this.cargarSedes();
    this.cargarBloques();
    this.cargarBloques();
    this.sede = new Sede("","","", new Bloque("",0));
  }

  cargarBloques() {
    this.bloqueService.bloques$.subscribe(bloques => {
      this.bloques = bloques;
    });
    this.bloqueService.cargarBloques();
  }

  cargarSedes() {
    this.sedeService.sedes$.subscribe(sedes => {
      this.sedes = sedes;
    });
    this.sedeService.cargarSedes();
  }

  agregarSede() {
    try {
      this.sedeService.agregarSede(this.sede);
      this.visibleDialogNewSede = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sede guardada con exito",
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
      if (this.sede.id != undefined) {
        this.sedeService.actualizarSede(this.sede.id, this.sede);
        this.visibleDialogEditSede = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sede actualizada con exito",
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

  actualizarSede(id: string) {
    try {
      this.visibleDialogEditSede = true;
      this.sede = new Sede("","","", new Bloque("",0));
      this.sedeService.obtenerSedePorId(id)
        .subscribe(
          sede => {
            this.sede = sede;
            this.sede.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener la sede",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarSede(id: string) {
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
        this.sedeService.eliminarSede(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Sede eliminada.",
          icon: "success"
        });
      }
    });
  }

  obtenerSedePorId(id: string) {
    try {
      this.sede = new Sede("","","", new Bloque("",0));
      this.visibleDialogViewSede = true;
      this.sedeService.obtenerSedePorId(id)
        .subscribe(
          sede => {
            this.sede = sede;
            this.sede.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener la sede",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewSede() {
    this.visibleDialogNewSede = true;
  }

}
