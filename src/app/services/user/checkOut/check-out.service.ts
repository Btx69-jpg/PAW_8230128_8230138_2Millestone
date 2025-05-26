import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../../model/order/item';
import { Order } from '../../../model/order/order';

const endPoint = 'http://localhost:3000/api/v1/checkout';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private http: HttpClient) {}

  getCart(): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/obterCarrinho`);
  }

  clearCart(): Observable<void> {
    //trocar para delete aqui e no outro trabalho
    return this.http.get<void>(`${endPoint}/limparCarrinho`);
  }

  updateQuantity(item: Item): Observable<Order> {
    return this.http.put<Order>(`${endPoint}/item/${item.item}`, { quantity: item.quantity });
  }}
