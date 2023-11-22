import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from '../model/Evento';
import { EventoService } from '../service/evento.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  carnets: Evento[] = [];
  carnet: Evento = new Evento("","","");
  visibleDialogNewCarnet: boolean = false;
  visibleDialogViewCarnet: boolean = false;
  visibleDialogEditCarnet: boolean = false;

  constructor(private carnetService: EventoService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarCarnets();
    this.cargarCarnets();
    this.carnet = new Evento("","","");
  }

  cargarCarnets() {
    this.carnetService.eventos$.subscribe(eventos => {
      this.carnets = eventos;
    });
    this.carnetService.cargarEventos();
  }

  agregarCarnet() {
    try {
      this.carnetService.agregarEvento(this.carnet);
      this.visibleDialogNewCarnet = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Evento guardado con exito",
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
        this.carnetService.actualizarEvento(this.carnet.id, this.carnet);
        this.visibleDialogEditCarnet = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Evento actualizado con exito",
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
      this.carnet = new Evento("","","");
      this.carnetService.obtenerEventoPorId(id)
        .subscribe(
          carnet => {
            this.carnet = carnet;
            this.carnet.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el evento",
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
        this.carnetService.eliminarEvento(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Evento eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerCarnetPorId(id: string) {
    try {
      this.carnet = new Evento("","","");
      this.visibleDialogViewCarnet = true;
      this.carnetService.obtenerEventoPorId(id)
        .subscribe(
          carnet => {
            this.carnet = carnet;
            this.carnet.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el evento",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewCarnet() {
    this.visibleDialogNewCarnet = true;
  }

}
