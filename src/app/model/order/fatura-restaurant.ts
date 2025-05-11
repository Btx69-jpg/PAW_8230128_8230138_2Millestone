export class FaturaRestaurant {
    _id: string;
    name: string;
    phoneNumber: number;
    email: string;

    constructor(_id: string, name: string, phoneNumber: number, email: string) {
        this._id = _id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;

        // validações
        this.validateName();
        this.validatePhoneNumber();
        this.validateEmail();
    }

    private validateName() {
        if (!this.name?.trim()) {
            throw new Error('O nome é obrigatório');
        }
        
        if (this.name.length > 100) {
            throw new Error('O nome deve ter no máximo 100 caracteres');
        }
    }

    private validatePhoneNumber() {
        if (this.phoneNumber < 100000000 || this.phoneNumber > 999999999) {
            throw new Error('O telefone deve ter exatamente 9 dígitos');
        }
    }

    private validateEmail() {
        const regex = /^([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})*$/;
        if (!regex.test(this.email)) {
            throw new Error('Formato inválido para o email');
        }

        if (this.email.length > 50) {
            throw new Error('O email deve ter no máximo 50 caracteres');
        }
    }
}
