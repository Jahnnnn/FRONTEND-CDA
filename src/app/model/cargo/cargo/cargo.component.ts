import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from '../model/Cargo';
import { CargoService } from '../service/cargo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit{
  cargos: Cargo[] = [];
  cargo: Cargo = new Cargo("", "");
  visibleDialogNewCargo: boolean = false;
  visibleDialogViewCargo: boolean = false;
  visibleDialogEditCargo: boolean = false;

  constructor(private cargoService: CargoService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarCargos();
    this.cargarCargos();
    this.cargo = new Cargo("", "");
  }

  cargarCargos() {
    this.cargoService.cargos$.subscribe(cargos => {
      this.cargos = cargos;
    });
    this.cargoService.cargarCargos();
  }

  agregarCargo() {
    try {
      this.cargoService.agregarCargo(this.cargo);
      this.visibleDialogNewCargo = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cargo guardado con exito",
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
      if (this.cargo.id != undefined) {
        this.cargoService.actualizarCargo(this.cargo.id, this.cargo);
        this.visibleDialogEditCargo = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cargo actualizado con exito",
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

  actualizarCargo(id: string) {
    try {
      this.visibleDialogEditCargo = true;
      this.cargo = new Cargo("", "");
      this.cargoService.obtenerCargoPorId(id)
        .subscribe(
          cargo => {
            this.cargo = cargo;
            this.cargo.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el cargo",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarCargo(id: string) {
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
        this.cargoService.eliminarCargo(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Cargo eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerCargoPorId(id: string) {
    try {
      this.cargo = new Cargo("","");
      this.visibleDialogViewCargo = true;
      this.cargoService.obtenerCargoPorId(id)
        .subscribe(
          cargo => {
            this.cargo = cargo;
            this.cargo.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el cargo",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewCargo() {
    this.visibleDialogNewCargo = true;
  }


}
