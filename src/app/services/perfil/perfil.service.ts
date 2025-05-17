import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/perfil/user';

const endPoint = 'http://localhost:3000/api/v1/logout';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  /**
   * * Procura por utilizador especifico
   * */
  getLogout(): Observable<void> {
    return this.http.get<void>(`${endPoint}`, {withCredentials: true});
  }
}
