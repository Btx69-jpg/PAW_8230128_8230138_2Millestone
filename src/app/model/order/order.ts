import { Item } from './item';
import { FaturaRestaurant } from './fatura-restaurant';
import { FaturaCliente } from './fatura-cliente';
import { AddressOrder } from './address-order';

export class Order {
    _id: string;
    date: Date;
    client: FaturaCliente;
    restaurant: FaturaRestaurant;
    addressOrder: AddressOrder;
    itens: Item[];
    price: number;
    status: 'Pendente' | 'Expedida' | 'Entregue';
    type: 'delivery' | 'pickup';

    constructor(
        _id: string, date: Date, client: FaturaCliente, restaurant: FaturaRestaurant, 
        addressOrder: AddressOrder, itens: Item[],price: number,
        status: 'Pendente' | 'Expedida' | 'Entregue' = 'Pendente',
        type: 'delivery' | 'pickup') {
        this._id = _id;
        this.date = date;
        this.client = client;
        this.restaurant = restaurant;
        this.addressOrder = addressOrder;
        this.itens = itens;
        this.price = price;
        this.status = status;
        this.type = type;

        // validações
        this.validateClient();
        this.validateRestaurant();
        this.validateAddress();
        this.validateItens();
        this.validatePrice();
        this.validateStatus();
        this.validateType();
    }

    private validateClient() {
        if (!this.client) {
            throw new Error('O campo client é obrigatório');
        }
    }

    private validateRestaurant() {
        if (!this.restaurant) {
            throw new Error('O campo restaurant é obrigatório');
        }
    }

    private validateAddress() {
        if (!this.addressOrder) {
            throw new Error('O campo addressOrder é obrigatório');
        }
    }

    private validateItens() {
        if (!Array.isArray(this.itens) || this.itens.length === 0) {
            throw new Error('Deve haver pelo menos um item na encomenda');
        }
    }

    private validatePrice() {
        if (this.price < 0) {
            throw new Error('O valor mínimo da encomenda deve ser 0');
        }
    }

    private validateStatus() {
        const allowed = ['Pendente', 'Expedida', 'Entregue'] as const;
        if (!allowed.includes(this.status)) {
            throw new Error(`Status inválido: deve ser um dos ${allowed.join(', ')}`);
        }
    }

    private validateType() {
        const allowed = ['delivery', 'pickup'] as const;
        if (!allowed.includes(this.type)) {
            throw new Error(`Type inválido: deve ser 'delivery' ou 'pickup'`);
        }
    }
}
