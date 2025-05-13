import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../model/order/order';

const endPoint = 'http://localhost:3000/api/v1/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class HistoricOrderService {
  constructor(private http: HttpClient) {}

  /**
   * * Procura pelo historico de encomendas do utilizador
   * */
  getHistoricOrder(userId: String): Observable<Order[]> {
    return this.http.get<Order[]>(`${endPoint}/${userId}/historicOrder`);
  }

  /**
   * * Procura pelo historico de encomendas do utilizador
   * */
  getSearchHistoricOrder(userId: String): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/${userId}/historicOrder/search`);
  }

  /**
   * * Procura por uma encomenda especifica no historico de encomendas do utilizador
   * */
  getOrderofHistoric(userId: String, orderId: String): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/${userId}/historicOrder/${orderId}`);
  }
}
