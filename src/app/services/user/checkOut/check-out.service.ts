import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../../model/order/item';
import { Order } from '../../../model/order/order';
import { Restaurant } from '../../../model/perfil/restaurant';

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
    return this.http.get<void>(`${endPoint}/limparCarrinho/${userId}`);
  }

  updateQuantity(item: Item): Observable<Order> {
    return this.http.put<Order>(`${endPoint}/item/${item.item}`, { quantity: item.quantity });
  }

  save(idTemp: string , cart: Order): Observable<Order> {
    return this.http.post<Order>(`${endPoint}/save/${idTemp}`, cart, httpOptions);
  }

  saveNewOrder(idTemp: string, restId: string, order: Order): Observable<Order> {
  return this.http.post<Order>(`${endPoint}/saveNewOrder/${idTemp}/${restId}`, order, httpOptions);
  }

  getRestaurant(restId: String): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${endPoint}/getRestaurante/${restId}`, httpOptions);
  }
}