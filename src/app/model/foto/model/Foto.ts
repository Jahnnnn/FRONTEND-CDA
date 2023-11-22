export class Foto{

    public id?: string;
    public foto?: string;
    public fechaDeCreacion: Date = new Date();
    constructor(id: string, foto: string, fechaDeCreacion: Date){}
}