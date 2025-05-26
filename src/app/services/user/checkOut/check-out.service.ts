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

  getCart(userId: String): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/obterCarrinho/${userId}`);
  }

  clearCart(userId: String): Observable<void> {
    //trocar para delete aqui e no outro trabalho
    return this.http.get<void>(`${endPoint}/limparCarrinho/${userId}`);
  }

  updateQuantity(item: Item): Observable<Order> {
    return this.http.put<Order>(`${endPoint}/item/${item.item}`, { quantity: item.quantity });
  }

  save(idTemp: string , cart: Order): Observable<Order> {
    return this.http.post<Order>(`${endPoint}/save/${idTemp}`, cart, httpOptions);
  }
}
