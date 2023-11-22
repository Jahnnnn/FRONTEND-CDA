import { PermisoModulo } from "../../permisoModulo/model/PermisoModulo";

export class Rol{

    public id?: string;
    public nombreRol?: string;
    //Llaves foraneas
    public permiso?: PermisoModulo;
    //
    constructor(id: string, nombreRol: string, permiso: PermisoModulo){}
}