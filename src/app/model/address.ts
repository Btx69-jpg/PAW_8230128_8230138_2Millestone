export class Address {
    street: string;
    postal_code: string;
    city: string;

    constructor(street: string, postal_code: string, city: string) {
        this.street = street;
        this.postal_code = postal_code;
        this.city = city;

        //Validações
        //this.validateStreet();
        //this.validateCity();
        //this.validatePostalCode();
    }

    private validateStreet() {
        if (this.street.length > 250) {
            throw Error("A rua não pode ter mais de 250");
        }
    }

    private validatePostalCode() {
        const regexPostalCode = /^\d{4}-\d{3}$/;

        if (!regexPostalCode.test(this.postal_code) || this.postal_code.length !== 9) {
            throw new Error('Formato inválido para o código postal. Deve ser “1234-567”');
        }
    }

    private validateCity() {
        if (this.street.length > 100) {
            throw Error("A rua não pode ter mais de 250");
        }
    }
}