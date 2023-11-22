import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from '../model/Rol';
import { RolService } from '../service/rol.service';
import Swal from 'sweetalert2'
import { PermisoModulo } from '../../permisoModulo/model/PermisoModulo';
import { Modulo } from '../../modulo/model/Modulo';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  roles: Rol[] = [];
  rol: Rol = new Rol("","", new PermisoModulo("","", new Modulo("","","")));
  visibleDialogNewRol: boolean = false;
  visibleDialogViewRol: boolean = false;
  visibleDialogEditRol: boolean = false;

  constructor(private rolService: RolService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarRoles();
    this.cargarRoles();
    this.rol = new Rol("","", new PermisoModulo("","", new Modulo("","","")));
  }

  cargarRoles() {
    this.rolService.roles$.subscribe(roles => {
      this.roles = roles;
    });
    this.rolService.cargarRoles();
  }

  agregarRol() {
    try {
      this.rolService.agregarRol(this.rol);
      this.visibleDialogNewRol = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Rol guardado con exito",
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
      if (this.rol.id != undefined) {
        this.rolService.actualizarRol(this.rol.id, this.rol);
        this.visibleDialogEditRol = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Rol actualizado con exito",
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

  actualizarRol(id: string) {
    try {
      this.visibleDialogEditRol = true;
      this.rol = new Rol("","", new PermisoModulo("","", new Modulo("","","")));
      this.rolService.obtenerRolPorId(id)
        .subscribe(
          rol => {
            this.rol = rol;
            this.rol.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el rol",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarRol(id: string) {
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
        this.rolService.eliminarRol(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Rol eliminado.",
          icon: "success"
        });
      }
    });
  }

  obtenerRolPorId(id: string) {
    try {
      this.rol = new Rol("","", new PermisoModulo("","", new Modulo("","","")));
      this.visibleDialogViewRol = true;
      this.rolService.obtenerRolPorId(id)
        .subscribe(
          rol => {
            this.rol = rol;
            this.rol.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener el rol",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewRol() {
    this.visibleDialogNewRol = true;
  }
}
