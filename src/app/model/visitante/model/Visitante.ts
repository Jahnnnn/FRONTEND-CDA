import { Evento } from "../../evento/model/Evento";
import { Persona } from "../../persona/model/Persona";
import { TipoDocumento } from "../../tipoDocumento/model/TipoDocumento";

export class Visitante{

    public id?: string;
    public numeroDocumento?: string;
    public descripcionVisita?: string;
    //Llaves foraneas
    public tipoDocumento?: TipoDocumento;
    public persona?: Persona;
    public evento?: Evento;
    //
    constructor(id: string, numeroDocumento: string, descripcionVisita: string, tipoDocumento: TipoDocumento, persona: Persona, evento: Evento){}
}