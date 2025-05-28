import { Perfil } from "./perfil";

export class Restaurant {
    _id?: string;
    name: string;
    perfil: Perfil;
    description?: string;
    maxOrdersPerClient: number;
    maximumRadiusDelivery: number;
    timeConfection: number;
    timeDelivery: number;
    openingTime: number;
    closingTime: number;

    constructor(name: string, perfil: Perfil, maxOrdersPerClient: number, maximumRadiusDelivery: number,
        timeConfection: number, timeDelivery: number, openingTime: number, closingTime: number, 
        _id?: string ) {
        this._id = _id;
        this.name = name;
        this.perfil = perfil;
        this.maxOrdersPerClient = maxOrdersPerClient;
        this.maximumRadiusDelivery = maximumRadiusDelivery;
        this.timeConfection = timeConfection;
        this.timeDelivery = timeDelivery;
        this.openingTime = openingTime;
        this.closingTime = closingTime;

        this.validateAll();
    }

    private validateAll() {
        this.validateName();
        this.validateMaxOrders();
        this.validateRadius();
        this.validateTimes();
        this.validateOpeningHours();
    }

    private validateName() {
        if (!this.name) {
            throw new Error("O nome é obrigatório");
        }
        
        if (this.name.length > 100) {
            throw new Error("O nome deve ter no máximo 100 caracteres");
        }
    }

    private validateMaxOrders() {
        if (this.maxOrdersPerClient < 1) {
            throw new Error("A codeção tem de ter um tempo minimo de 0 minutos");
        }
    }

    private validateRadius() {
        if (this.maximumRadiusDelivery < 0) {
            throw new Error("O raio mínimo de entrega é 0 km");
        }
    }

    private validateTimes() {
        if (this.timeConfection < 0) {
            throw new Error("A codeção tem de ter um tempo minimo de 0 minutos");
        }

        if (this.timeDelivery < 0) {
            throw new Error("A entrega tem de ter um tempo minimo de 0 minutos");
        }
    }

    private validateOpeningHours() {
        const minTime = 0;
        const maxTime = 86400;

        if (this.openingTime < minTime || this.openingTime > maxTime) {
            throw new Error("A hora de abertura deve estar entre 00:00:00 e 24:00:00");
        }

        if (this.closingTime < minTime || this.closingTime > maxTime) {
            throw new Error("A hora de fecho deve estar entre 00:00:00 e 24:00:00");
        }
    }
}
