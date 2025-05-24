import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/perfil/user';
import { Password } from '../../model/perfil/password'
import { UpdateUserDados } from '../../model/perfil/Update/UpdateUserDados';

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
   * * Procura por utilizador especifico e retorna os campos editaveis do mesmo
   * */
  getUserEdit(userId: String): Observable<UpdateUserDados> {
    return this.http.get<UpdateUserDados>(`${endPoint}/${userId}/editData`);
  }

  /**
   * * Atualiza os dados do utilizador
   * */
  putUser(userId: String, formData: FormData ): Observable<UpdateUserDados> {
    return this.http.put<UpdateUserDados>(`${endPoint}/${userId}`, formData);
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
  putPasswordUser(userId: String, updatePassword: Password): Observable<Password> {
    return this.http.put<Password>(`${endPoint}/${userId}/ChangePassword`, updatePassword, httpOptions);
  }
}
