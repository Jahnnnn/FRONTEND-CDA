import { Modulo } from "../../modulo/model/Modulo";

export class PermisoModulo{

    public id?: string;
    public nombrePermiso?: string;
    //Llaves foraneas
    public modulo?: Modulo;
    //
    constructor(id: string, nombrePermiso: string, modulo: Modulo){}
}