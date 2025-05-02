import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
/**
 * * Classe que representa o componente de perfil.
 *  */
export class PerfilComponent {
  _id: string;
  email: string;
  password: string;
  historicOrders: string[];
  priority: string;
  phoneNumber: number;
  banned: boolean;
  perfilPhoto: string;
  
  /**
   * Construtor da classe PerfilComponent.
   * @param _id - ID do utilizador.
   * @param email - Email do utilizador.
   * @param password - Password do utilizador.
   * @param historicOrders - Lista de pedidos históricos do utilizador.
   * @param priority - Prioridade do utilizador.
   * @param phoneNumber - Número de telefone do utilizador.
   * @param banned - Indica se o utilizador está banido.
   * @param perfilPhoto - URL da foto de perfil do utilizador.
   */
  constructor(_id: string, email: string, password: string, historicOrders: string[], priority: string, phoneNumber: number, banned: boolean, perfilPhoto: string) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.historicOrders = historicOrders;
    this.priority = priority;
    this.phoneNumber = phoneNumber;
    this.banned = banned;
    this.perfilPhoto = perfilPhoto;
  }
}
