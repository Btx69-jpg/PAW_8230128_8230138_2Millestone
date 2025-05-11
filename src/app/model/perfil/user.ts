import { AddressOrder } from "../order/address-order";
import { Perfil } from "./perfil";
import { Order } from "../order/order";

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    perfil: Perfil;
    addresses: AddressOrder[];
    cart: Order[];
    birthdate?: Date;

    constructor(_id: string, firstName: string, lastName: string, perfil: Perfil,
        addresses: AddressOrder[], cart: Order[] = [], birthdate?: Date) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.perfil = perfil;
        this.addresses = addresses;
        this.cart = cart;
        this.birthdate = birthdate;

        this.validateFirstName();
        this.validateLastName();
        this.validatePerfil();
        this.validateAddresses();
        this.validateCart();
        this.validateBirthdate();
    }

    private validateFirstName() {
        if (!this.firstName) {
            throw new Error('O primeiro nome é obrigatório');
        }

        if (this.firstName.length > 50) {
            throw new Error('O primeiro nome deve ter no máximo 50 caracteres');
        }

        if (!/^[a-zA-Z\s]*$/.test(this.firstName)) {
            throw new Error('Formato inválido para o primeiro nome');
        }
    }

    private validateLastName() {
        if (!this.lastName) {
            throw new Error('O último nome é obrigatório');
        }

        if (this.lastName.length > 50) {
            throw new Error('O último nome deve ter no máximo 50 caracteres');
        }

        if (!/^[a-zA-Z\s]*$/.test(this.lastName)) {
            throw new Error('Formato inválido para o último nome');
        }
    }

    private validatePerfil() {
        if (!this.perfil) {
            throw new Error('O campo perfil é obrigatório');
        }
    }

    private validateAddresses() {
        if (!Array.isArray(this.addresses)) {
            throw new Error('O campo addresses deve ser um array');
        }
    }

    private validateCart() {
        if (!Array.isArray(this.cart)) {
            throw new Error('O campo cart deve ser um array');
        }
    }

    private validateBirthdate() {
        if (!this.birthdate) { 
            return;
        }
        
        const minDate = new Date('1900-01-01');
        const maxDate = new Date();
        if (this.birthdate < minDate) {
            throw new Error('A data mínima é 1900-01-01');
        }

        if (this.birthdate > maxDate) {
            throw new Error('A data máxima é a data atual');
        }
    }
}
