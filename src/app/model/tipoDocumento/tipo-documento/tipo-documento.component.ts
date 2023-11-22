import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoDocumento } from '../model/TipoDocumento';
import { TipoDocumentoService } from '../service/tipo-documento.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit{
  tiposDocumento: TipoDocumento[] = [];
  tipoDocumento: TipoDocumento = new TipoDocumento("", "", "");
  visibleDialogNewDocumento: boolean = false;
  visibleDialogViewDocumento: boolean = false;
  visibleDialogEditDocumento: boolean = false;

  constructor(private documentoService: TipoDocumentoService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarTiposDocumento();
    this.cargarTiposDocumento();
    this.tipoDocumento = new TipoDocumento("", "", "");
  }

  cargarTiposDocumento() {
    this.documentoService.tiposDocumento$.subscribe(tiposDocumento => {
      this.tiposDocumento = tiposDocumento;
    });
    this.documentoService.cargarTiposDocumento();
  }

  agregarTipoDocumento() {
    try {
      this.documentoService.agregarTipoDocumento(this.tipoDocumento);
      this.visibleDialogNewDocumento = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tipo de documento guardado con exito",
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
      if (this.tipoDocumento.id != undefined) {
        this.documentoService.actualizarTipoDocumento(this.tipoDocumento.id, this.tipoDocumento);
        this.visibleDialogEditDocumento = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tipo de documento actualizado con exito",
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

  actualizarTipoDocumento(id: string) {
    try {
      this.visibleDialogEditDocumento = true;
      this.tipoDocumento = new TipoDocumento("", "", "");
      this.documentoService.obtenerTipoDocumentoPorId(id)
        .subscribe(
          tipoDocumento => {
            this.tipoDocumento = tipoDocumento;
            this.tipoDocumento.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el tipo de documento",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarTipoDocumento(id: string) {
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
        this.documentoService.eliminarTipoDocumento(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Tipo de documento eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerTipoDocumentoPorId(id: string) {
    try {
      this.tipoDocumento = new TipoDocumento("","","");
      this.visibleDialogViewDocumento = true;
      this.documentoService.obtenerTipoDocumentoPorId(id)
        .subscribe(
          tipoDocumento => {
            this.tipoDocumento = tipoDocumento;
            this.tipoDocumento.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el tipo de documento",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewDocumento() {
    this.visibleDialogNewDocumento = true;
  }

}
