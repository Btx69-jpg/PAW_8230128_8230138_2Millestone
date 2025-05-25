import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
   * * Permite filtrar pelas encomendas do utilizador
   */
  searchOrders(userId: string, filters?: {
    nameRest?: string;
    status?: 'all' | 'Pendente' | 'Expedida';
  }): Observable<Order[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.nameRest) {
        params = params.set('nameRest', filters.nameRest);
      }

      if (filters.status) {
        params = params.set('status', filters.status);
      }
    }
    return this.http.get<Order[]>(`${endPoint}/${userId}/orders/search`);
  }

  /**
   * * Procurar por uma encomenda especifica
   */
  getOrder(userId: String, orderId: String): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/${userId}/orders/${orderId}`);
  }
  

  /**
   * * Cancela uma encomenda realizada pelo utilizador
   */
  cancelOrder(userId: String, orderId: String): Observable<Order> {
    return this.http.delete<Order>(`${endPoint}/${userId}/orders/${orderId}`);
  }
}
