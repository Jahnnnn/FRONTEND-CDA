import { Persona } from "../../persona/model/Persona";

export class Salida{

    public id?: string;
    public fecha: Date = new Date();
    //Llaves foraneas
    public persona?: Persona;
    //
    constructor(id: string, fecha: Date, persona: Persona){}
}