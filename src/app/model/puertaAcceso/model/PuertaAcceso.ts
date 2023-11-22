import { Bloque } from "../../bloque/model/Bloque";

export class PuertaAcceso{

    public id?: string;
    public numeroDePuerta?: number;
    //Llaves foraneas
    public bloque?: Bloque;
    //
    constructor(id: string, numeroDePuerta: number, bloque: Bloque){}
}