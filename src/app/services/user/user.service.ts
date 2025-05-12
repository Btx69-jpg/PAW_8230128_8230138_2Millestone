import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/perfil/user';
import { Password } from '../../model/perfil/password'

const endPoint = 'http://localhost:3000/api/v1/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * * Procura por utilizador especifico
   * */
  getUser(userId: String): Observable<User> {
    return this.http.get<User>(`${endPoint}/${userId}`);
  }

  /**
   * * Atualiza os dados do utilizador
   * */
  putUser(userId: String, atualizarUser: User): Observable<User> {
    return this.http.put<User>(`${endPoint}/${userId}`, atualizarUser, httpOptions);
  }

  /**
   * * Permite eliminar um utilizador
   * */
  deleteUser(userId: String): Observable<User> {
    return this.http.delete<User>(`${endPoint}/${userId}`);
  }

  /**
   * * Permite atualizar a password do Utilizador
   * */
  putPasswordUser(userId: String, updatePassword: Password): Observable<User> {
    return this.http.put<User>(`${endPoint}/${userId}`, updatePassword, httpOptions);
  }
}
