import { AddressOrder } from './order/address-order';

export class Address {
    _id: String;
    address: AddressOrder;
    nif?: number;


    constructor(_id: string, address: AddressOrder, nif?: number) {
        this._id = _id;
        this.address = address;
        this.nif = nif;

        //Validacoes
        this.validateNif();
    }

    private validateNif() {
        if (typeof this.nif === 'number') {
            if (this.nif < 100000000 || this.nif > 999999999) {
                throw new Error('O NIF tem de ser um número entre 100000000 e 999999999');
            }
        }
    }
}