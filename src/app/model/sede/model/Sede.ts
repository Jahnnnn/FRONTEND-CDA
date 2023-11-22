import { Bloque } from "../../bloque/model/Bloque";

export class Sede{

    public id?: string;
    public nombreSede?: string;
    public direccionSede?: string;
    //Llaves foraneas
    public bloque?: Bloque;
    //
    constructor(id: string, nombreSede: string, direccionSede: string, bloque: Bloque){}
}