import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../model/order/order';
import { Restaurant } from '../../model/perfil/restaurant';

const endPoint = 'http://localhost:3000/api/v1/cart';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  getCart(userId: String): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/obterCarrinho/${userId}`);
  }

  clearCart(userId: String): Observable<void> {
    return this.http.get<void>(`${endPoint}/limparCarrinho/${userId}`);
  }

  save(idTemp: string , cart: Order): Observable<Order> {
    return this.http.post<Order>(`${endPoint}/save/${idTemp}`, cart, httpOptions);
  }

  getRestaurant(restId: String): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${endPoint}/getRestaurante/${restId}`, httpOptions);
  }
}