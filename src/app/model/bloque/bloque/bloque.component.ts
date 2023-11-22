import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bloque } from '../model/Bloque';
import { BloqueService } from '../service/bloque.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-bloque',
  templateUrl: './bloque.component.html',
  styleUrls: ['./bloque.component.scss']
})
export class BloqueComponent implements OnInit {
  
  bloques: Bloque[] = [];
  bloque: Bloque = new Bloque("", 0);
  visibleDialogNewBloque: boolean = false;
  visibleDialogViewBloque: boolean = false;
  visibleDialogEditBloque: boolean = false;

  constructor(private bloqueService: BloqueService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarBloques();
    this.cargarBloques();
    this.bloque = new Bloque("", 0);
  }

  cargarBloques() {
    this.bloqueService.bloques$.subscribe(bloques => {
      this.bloques = bloques;
    });
    this.bloqueService.cargarBloques();
  }

  agregarBloque() {
    try {
      this.bloqueService.agregarBloque(this.bloque);
      this.visibleDialogNewBloque = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Bloque guardado con exito",
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
      if (this.bloque.id != undefined) {
        this.bloqueService.actualizarBloque(this.bloque.id, this.bloque);
        this.visibleDialogEditBloque = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bloque actualizado con exito",
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

  actualizarBloque(id: string) {
    try {
      this.visibleDialogEditBloque = true;
      this.bloque = new Bloque("", 0);
      this.bloqueService.obtenerBloquePorId(id)
        .subscribe(
          bloque => {
            this.bloque = bloque;
            this.bloque.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el bloque",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarBloque(id: string) {
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
        this.bloqueService.eliminarBloque(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Bloque eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerBloquePorId(id: string) {
    try {
      this.bloque = new Bloque("", 0);
      this.visibleDialogViewBloque = true;
      this.bloqueService.obtenerBloquePorId(id)
        .subscribe(
          bloque => {
            this.bloque = bloque;
            this.bloque.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el bloque",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewBloque() {
    this.visibleDialogNewBloque = true;
  }

}
