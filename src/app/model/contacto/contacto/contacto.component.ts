import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from '../model/Contacto';
import { ContactoService } from '../service/contacto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  contactos: Contacto[] = [];
  contacto: Contacto = new Contacto("","",0,"");
  visibleDialogNewContacto: boolean = false;
  visibleDialogViewContacto: boolean = false;
  visibleDialogEditContacto: boolean = false;

  constructor(private contactoService: ContactoService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarContactos();
    this.cargarContactos();
    this.contacto = new Contacto("","",0,"");
  }

  cargarContactos() {
    this.contactoService.contactos$.subscribe(contactos => {
      this.contactos = contactos;
    });
    this.contactoService.cargarContactos();
  }

  agregarContacto() {
    try {
      this.contactoService.agregarContacto(this.contacto);
      this.visibleDialogNewContacto = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contacto guardado con exito",
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
      if (this.contacto.id != undefined) {
        this.contactoService.actualizarContacto(this.contacto.id, this.contacto);
        this.visibleDialogEditContacto = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Contacto actualizado con exito",
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

  actualizarContacto(id: string) {
    try {
      this.visibleDialogEditContacto = true;
      this.contacto = new Contacto("","",0,"");
      this.contactoService.obtenerContactoPorId(id)
        .subscribe(
          contacto => {
            this.contacto = contacto;
            this.contacto.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el contacto",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarContacto(id: string) {
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
        this.contactoService.eliminarContacto(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Contacto eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerContactoPorId(id: string) {
    try {
      this.contacto = new Contacto("","",0,"");
      this.visibleDialogViewContacto = true;
      this.contactoService.obtenerContactoPorId(id)
        .subscribe(
          contacto => {
            this.contacto = contacto;
            this.contacto.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el contacto",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewContacto() {
    this.visibleDialogNewContacto = true;
  }
}
