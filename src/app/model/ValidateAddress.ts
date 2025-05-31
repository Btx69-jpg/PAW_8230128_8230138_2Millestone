export class ValidateRadiusDelivery {
    dentroDoLimite: boolean;
    distanciaKm: number;
    error?: string;

    constructor(sucesso: boolean, dentroDoLimite: boolean, distanciaKm: number, error?:string) {
        this.dentroDoLimite = dentroDoLimite;
        this.distanciaKm = distanciaKm;
        this.error = error;
    }
}