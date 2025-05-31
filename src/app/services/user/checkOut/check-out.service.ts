import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../../model/order/order';
import { Address } from '../../../model/address';
import { ValidateRadiusDelivery } from '../../../model/ValidateAddress';

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

  saveNewOrder(idTemp: string, restId: string, order: Order): Observable<Order> {
    return this.http.post<Order>(`${endPoint}/saveNewOrder/${idTemp}/${restId}`, order, httpOptions);
  }

  validateDeliveryRadius(addressRet: Address, addressClient: Address, distanceKm: Number): Observable<ValidateRadiusDelivery> {
    const body = {
      addressRet,
      addressClient,
      distanceKm
    };
    
    return this.http.post<ValidateRadiusDelivery>(`${endPoint}/validateDeliveryRadius`, body);
  }
}