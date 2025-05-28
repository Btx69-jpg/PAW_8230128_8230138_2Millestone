export class Item {
    _id: string;
    from: string;
    photo: string;
    item: string;
    portion: string;
    price: number;
    quantity: number;

    constructor(_id: string, from:string, photo:string, item: string, portion: string, price: number, quantity: number) {
        this._id = _id;
        this.from = from;
        this.photo = photo;
        this.item = item;
        this.portion = portion;
        this.price = price;
        this.quantity = quantity;

        this.validateItem();
        this.validatePortion();
        this.validatePrice();
        this.validateQuantity();
    }

    private validateItem() {
        if (!this.item) {
            throw new Error('O “item” é obrigatório');
        }
        
        if (this.item.length > 50) {
            throw new Error('O título deve ter no máximo 50 caracteres');
        }
        
        const regex = /^[\p{L}\s]+$/u;
        if (!regex.test(this.item)) {
            throw new Error('Formato inválido para o nome do item');
        }
    }

    private validatePortion() {
        if (this.portion.length > 25) {
            throw new Error('A porção deve ter no máximo 25 caracteres');
        }

        const regex = /^[\p{L}\s]+$/u;
        if (this.portion && !regex.test(this.portion)) {
            throw new Error('Formato inválido para o nome da porção');
        }
    }

    private validatePrice() {
        if (this.price < 0) {
            throw new Error('O preço mínimo é 0€');
        }
    }

    private validateQuantity() {
        if (this.quantity < 1) {
            throw new Error('Número mínimo de pratos selecionados é 1');
        }
        
        if (this.quantity > 10) {
            throw new Error('Número máximo de pratos é 10');
        }
    }
}
