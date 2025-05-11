import { Order } from '../order/order';

export class Perfil {
    _id: string;
    perfilPhoto: string;
    phoneNumber: number;
    email: string;
    password: string;
    orders: Order[];
    historicOrders: Order[];
    priority: 'Cliente' | 'Admin' | 'Restaurant' | 'Dono' ;
    restaurantIds?: string[];
    ownersIds?: string[];
    banned: boolean;

  constructor(_id: string, perfilPhoto: string = '', phoneNumber: number, email: string,
    password: string, priority: 'Cliente' | 'Admin' | 'Restaurant' | 'Dono',
    orders: Order[] = [], historicOrders: Order[] = [], restaurantIds?: string[],
    ownersIds?: string[], banned: boolean = false,) {
    this._id = _id;
    this.perfilPhoto = perfilPhoto;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.priority = priority;
    this.orders = orders;
    this.historicOrders = historicOrders;
    this.restaurantIds = restaurantIds;
    this.ownersIds = ownersIds;
    this.banned = banned;

    //Validacoes
    this.validatePhoneNumber();
    this.validateEmail();
    this.validatePassword();
    this.validateRoleConstraints();
  }

  private validatePhoneNumber() {
    if (this.phoneNumber < 100000000 || this.phoneNumber > 999999999) {
        throw new Error('O numero de telefone tem de ser um numero entre 100000000 e 999999999');
    }
  }

  private validateEmail() {
    const regexEmail = /^([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})*$/;
    if (!regexEmail.test(this.email)) {
      throw new Error('Formato inválido para o email');
    }

    if (this.email.length > 50) {
      throw new Error('O email deve ter no máximo 50 caracteres');
    }
  }

  private validatePassword() {
    if (this.password.length < 8) {
      throw new Error('A password deve ter no mínimo 8 caracteres');
    }
  }

  private validateRoleConstraints() {
    if (this.priority === 'Dono' && (!this.restaurantIds || this.restaurantIds.length === 0)) {
      throw new Error('Um perfil Dono deve ter pelo menos um restaurantId');
    }

    if (this.priority === 'Restaurant' && (!this.ownersIds || this.ownersIds.length === 0)) {
      throw new Error('Um perfil Restaurant deve ter pelo menos um ownerId');
    }
  }
}