import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../model/order/order';

const endPoint = 'http://localhost:3000/api/v1/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  /**
   * * Procura por utilizador especifico
   * */
  getOrders(userId: String): Observable<Order[]> {
    return this.http.get<Order[]>(`${endPoint}/${userId}/orders`);
  }

  /**
   * * Procurar por uma encomenda especifica
   */
  getOrder(userId: String, orderId: String): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/${userId}/orders/${orderId}`);
  }
}
