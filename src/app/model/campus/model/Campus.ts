import { Sede } from "../../sede/model/Sede";

export class Campus{
    public id?: string;
    public nombreDelCampus?: string;
    //Llaves foraneas
    public sede?: Sede;

    constructor(id:string, nombreDelCampus:string, sede:Sede){}
}