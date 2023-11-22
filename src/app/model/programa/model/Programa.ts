import { Campus } from "../../campus/model/Campus";

export class Programa{

    public id?: string;
    public nombrePrograma?: string;
    //Llaves foraneas
    public campus?: Campus;
    //
    constructor(id: string, nombrePrograma: string, campus: Campus){}
}