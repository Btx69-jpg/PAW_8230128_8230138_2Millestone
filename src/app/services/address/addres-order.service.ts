import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressOrder } from '../../model/order/address-order';
import { newAddressOrder } from '../../model/order/newAddressOrder';

const endPoint = `http://localhost:3000/api/v1/user`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response' as const
};

@Injectable({
  providedIn: 'root'
})
export class AddresOrderService {

  constructor(private http: HttpClient) {}

  /**
   * * Permite carregar todas as moradas de um utilizador
   */
  getAddressesOrder(userId: String): Observable<AddressOrder[]> {
    return this.http.get<AddressOrder[]>(`${endPoint}/${userId}/addresses`);
  }

  /**
   * * Post para criar uma nova morada
   * 
   * !Ver se está bem (Testar)
   */
  postAddressOrder(userId: String, newAddress: newAddressOrder): Observable<HttpResponse<newAddressOrder>> {
    return this.http.post<newAddressOrder>(`${endPoint}/${userId}/addresses`, newAddress, httpOptions);
  }

  /**
   * * Permite consultar uma morada especifica do utilizador
   */
  getAddressOrder(userId: String, addressOrderId: String): Observable<AddressOrder> {
    return this.http.get<AddressOrder>(`${endPoint}/${userId}/addresses/${addressOrderId}`);
  }

  /**
   * * Permite atualizar os dados de uma morada do utilizador
   */
  putAddressOrder(userId: String, addressOrderId: String, updateAddress: AddressOrder): Observable<HttpResponse<AddressOrder>> {
    return this.http.put<AddressOrder>(`${endPoint}/${userId}/addresses/${addressOrderId}`, 
                                        updateAddress, 
                                        httpOptions);
  }

  /**
   * * Permite eliminar uma morada do utilizador
   */
  deleteAddressOrder(userId: String, addressOrderId: String): Observable<AddressOrder> {
    return this.http.delete<AddressOrder>(`${endPoint}/${userId}/addresses/${addressOrderId}`);
  }
}
