import { Campus } from "../../campus/model/Campus";
import { Cargo } from "../../cargo/model/Cargo";
import { Carnet } from "../../carnet/model/Carnet";
import { Contacto } from "../../contacto/model/Contacto";
import { Foto } from "../../foto/model/Foto";
import { Programa } from "../../programa/model/Programa";
import { Rol } from "../../rol/model/Rol";
import { TipoDocumento } from "../../tipoDocumento/model/TipoDocumento";

export class Persona{

    public id?: string;
    public primerNombre?: string;
    public segundoNombre?: string;
    public primerApellido?: string;
    public segundoApellido?: string;
    public numeroDocumento?: number;
    public contrasena?: string;
    //Llaves foraneas
    public carnet?: Carnet;
    public tipoDocumento?: TipoDocumento;
    public programa?: Programa;
    public campus?: Campus;
    public contacto?: Contacto;
    public cargo?: Cargo;
    public foto?: Foto;
    public rol?: Rol;
    //
    constructor(id: string, primerNombre: string, segundoNombre: string, primerApellido: string, 
        segundoApellido: string, numeroDocumento: number, contrasena: string, carnet: Carnet, 
        tipoDocumento: TipoDocumento, programa: Programa, campus: Campus, contacto: Contacto, 
        cargo: Cargo, foto: Foto, rol: Rol){}
}