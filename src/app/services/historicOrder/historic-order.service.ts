import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  getSearchHistoricOrder(userId: String, filters?: {
      nameRest?: string;
      price?: number;
      dateFrom?: string;
      dateTo?: string;
      order?: 'nameAsc' | 'nameDesc' | 'priceAsc' | 'priceDesc' | 'dateAsc' | 'dateDesc';
    }): Observable<Order[]> {

    let params = new HttpParams();

    if (filters) {
      if (filters.nameRest) {
        params = params.set('nameRest', filters.nameRest);
      }
      
      if (filters.price !== undefined) {
        params = params.set('price', filters.price.toString());
      }
      
      if (filters.dateFrom) {
        params = params.set('dateFrom', filters.dateFrom);
      }
      
      if (filters.dateTo) {
        params = params.set('dateTo', filters.dateTo);
      }

      if (filters.order) {
        params = params.set('order', filters.order);
      }
    }

    return this.http.get<Order[]>(`${endPoint}/${userId}/historicOrder/search`, { params });
  }

  /**
   * * Procura por uma encomenda especifica no historico de encomendas do utilizador
   * */
  getOrderofHistoric(userId: String, orderId: String): Observable<Order> {
    return this.http.get<Order>(`${endPoint}/${userId}/historicOrder/${orderId}`);
  }
}
