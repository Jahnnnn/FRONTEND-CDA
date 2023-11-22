import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carnet } from '../model/Carnet'; 
import { CarnetService } from '../service/carnet.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-carnet',
  templateUrl: './carnet.component.html',
  styleUrls: ['./carnet.component.scss']
})
export class CarnetComponent implements OnInit{
  carnets: Carnet[] = [];
  carnet: Carnet = new Carnet("", 0, 0);
  visibleDialogNewCarnet: boolean = false;
  visibleDialogViewCarnet: boolean = false;
  visibleDialogEditCarnet: boolean = false;

  constructor(private carnetService: CarnetService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarCarnets();
    this.cargarCarnets();
    this.carnet = new Carnet("", 0, 0);
  }

  cargarCarnets() {
    this.carnetService.carnets$.subscribe(carnets => {
      this.carnets = carnets;
    });
    this.carnetService.cargarCarnets();
  }

  agregarCarnet() {
    try {
      this.carnetService.agregarCarnet(this.carnet);
      this.visibleDialogNewCarnet = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Carnet guardado con exito",
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
      if (this.carnet.id != undefined) {
        this.carnetService.actualizarCarnet(this.carnet.id, this.carnet);
        this.visibleDialogEditCarnet = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Carnet actualizado con exito",
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

  actualizarCarnet(id: string) {
    try {
      this.visibleDialogEditCarnet = true;
      this.carnet = new Carnet("", 0, 0);
      this.carnetService.obtenerCarnetPorId(id)
        .subscribe(
          carnet => {
            this.carnet = carnet;
            this.carnet.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el carnet",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarCarnet(id: string) {
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
        this.carnetService.eliminarCarnet(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Carnet eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerCarnetPorId(id: string) {
    try {
      this.carnet = new Carnet("",0,0);
      this.visibleDialogViewCarnet = true;
      this.carnetService.obtenerCarnetPorId(id)
        .subscribe(
          carnet => {
            this.carnet = carnet;
            this.carnet.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el carnet",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewCarnet() {
    this.visibleDialogNewCarnet = true;
  }
}
