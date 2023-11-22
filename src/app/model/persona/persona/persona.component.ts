import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../model/Persona';
import { Carnet } from '../../carnet/model/Carnet';
import { CarnetService } from '../../carnet/service/carnet.service';
import { TipoDocumento } from '../../tipoDocumento/model/TipoDocumento';
import { TipoDocumentoService } from '../../tipoDocumento/service/tipo-documento.service';
import { Programa } from '../../programa/model/Programa';
import { ProgramaService } from '../../programa/service/programa.service';
import { Campus } from '../../campus/model/Campus';
import { CampusService } from '../../campus/service/campus.service';
import { Contacto } from '../../contacto/model/Contacto';
import { ContactoService } from '../../contacto/service/contacto.service';
import { Cargo } from '../../cargo/model/Cargo';
import { CargoService } from '../../cargo/service/cargo.service';
import { Foto } from '../../foto/model/Foto';
import { Rol } from '../../rol/model/Rol';
import { RolService } from '../../rol/service/rol.service';

import { PersonaService } from '../service/persona.service';
import Swal from 'sweetalert2'
import { Sede } from '../../sede/model/Sede';
import { Bloque } from '../../bloque/model/Bloque';
import { PermisoModulo } from '../../permisoModulo/model/PermisoModulo';
import { Modulo } from '../../modulo/model/Modulo';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
  contactos: Contacto[] = [];
  roles: Rol[] = [];
  personas: Persona[] = []
  carnets: Carnet[] = [];
  programas: Programa[] = [];
  campuses: Campus[] = [];
  cargos: Cargo[] = [];
  tiposDocumento: TipoDocumento[] = [];
  persona: Persona = new Persona("","","","","",0,"",
  new Carnet("",0,0),new TipoDocumento("","",""), 
  new Programa("","", new Campus("","", 
  new Sede("","","",new Bloque("",0)))), 
  new Campus("","", new Sede("","","", 
  new Bloque("",0))), new Campus("","", new Bloque("",0)),
  new Cargo("",""), new Foto("","",new Date()), 
  new Rol("", "",new PermisoModulo("","", new Modulo("","",""))));
  visibleDialogNewContacto: boolean = false;
  visibleDialogViewContacto: boolean = false;
  visibleDialogEditContacto: boolean = false;

  constructor(
    private contactoService: ContactoService, 
    private carnetService: CarnetService,
    private documentoService: TipoDocumentoService,
    private programaService: ProgramaService,
    private campusService: CampusService, 
    private personaService: PersonaService,
    private cargoService: CargoService,
    private rolService: RolService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.cargarContactos();
    this.cargarContactos();
    this.cargarCarnets();
    this.cargarCarnets();
    this.cargarTiposDocumento();
    this.cargarTiposDocumento();
    this.cargarProgramas();
    this.cargarProgramas();
    this.cargarCampuses();
    this.cargarCampuses();
    this.cargarCargos();
    this.cargarCargos();
    this.cargarRoles();
    this.cargarRoles();
    this.cargarPersonas();
    this.cargarPersonas();
    this.persona = new Persona("","","","","",0,"",
    new Carnet("",0,0),new TipoDocumento("","",""), 
    new Programa("","", new Campus("","", 
    new Sede("","","",new Bloque("",0)))), 
    new Campus("","", new Sede("","","", 
    new Bloque("",0))), new Campus("","", new Bloque("",0)),
    new Cargo("",""), new Foto("","",new Date()), 
    new Rol("", "",new PermisoModulo("","", new Modulo("","",""))));
  }

  cargarCampuses() {
    this.campusService.campuses$.subscribe(campuses => {
      this.campuses = campuses;
    });
    this.campusService.cargarCampuses();
  }

  cargarRoles() {
    this.rolService.roles$.subscribe(roles => {
      this.roles = roles;
    });
    this.rolService.cargarRoles();
  }

  cargarCargos() {
    this.cargoService.cargos$.subscribe(cargos => {
      this.cargos = cargos;
    });
    this.cargoService.cargarCargos();
  }

  cargarCarnets() {
    this.carnetService.carnets$.subscribe(carnets => {
      this.carnets = carnets;
    });
    this.carnetService.cargarCarnets();
  }

  cargarProgramas() {
    this.programaService.programas$.subscribe(programas => {
      this.programas = programas;
    });
    this.programaService.cargarProgramas();
  }

  cargarTiposDocumento() {
    this.documentoService.tiposDocumento$.subscribe(tiposDocumento => {
      this.tiposDocumento = tiposDocumento;
    });
    this.documentoService.cargarTiposDocumento();
  }

  cargarContactos() {
    this.contactoService.contactos$.subscribe(contactos => {
      this.contactos = contactos;
    });
    this.contactoService.cargarContactos();
  }
  cargarPersonas() {
    this.personaService.personas$.subscribe(personas => {
      this.personas = personas;
    });
    this.personaService.cargarContactos();
  }

  agregarPersona() {
    try {
      this.personaService.agregarContacto(this.persona);
      this.visibleDialogNewContacto = false;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Persona guardada con exito",
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
      if (this.persona.id != undefined) {
        this.personaService.actualizarContacto(this.persona.id, this.persona);
        this.visibleDialogEditContacto = false;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Persona actualizada con exito",
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

  actualizarPersona(id: string) {
    try {
      this.visibleDialogEditContacto = true;
      this.persona = new Persona("","","","","",0,"",
      new Carnet("",0,0),new TipoDocumento("","",""), 
      new Programa("","", new Campus("","", 
      new Sede("","","",new Bloque("",0)))), 
      new Campus("","", new Sede("","","", 
      new Bloque("",0))), new Campus("","", new Bloque("",0)),
      new Cargo("",""), new Foto("","",new Date()), 
      new Rol("", "",new PermisoModulo("","", new Modulo("","",""))));
      this.personaService.obtenerContactoPorId(id)
        .subscribe(
          persona => {
            this.persona = persona;
            this.persona.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener la persona",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  eliminarPersona(id: string) {
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
        this.personaService.eliminarContacto(id);
        Swal.fire({
          title: "Eliminado!",
          text: "Persona eliminada.",
          icon: "success"
        });
      }
    });
  }

  obtenerPersonaPorId(id: string) {
    try {
      this.persona = new Persona("","","","","",0,"",
      new Carnet("",0,0),new TipoDocumento("","",""), 
      new Programa("","", new Campus("","", 
      new Sede("","","",new Bloque("",0)))), 
      new Campus("","", new Sede("","","", 
      new Bloque("",0))), new Campus("","", new Bloque("",0)),
      new Cargo("",""), new Foto("","",new Date()), 
      new Rol("", "",new PermisoModulo("","", new Modulo("","",""))));
      this.visibleDialogViewContacto = true;
      this.personaService.obtenerContactoPorId(id)
        .subscribe(
          persona => {
            this.persona = persona;
            this.persona.id = id;
          });
    } catch (Error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No se logro obtener la persona",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  showDialogNewPersona() {
    this.visibleDialogNewContacto = true;
  }
}
