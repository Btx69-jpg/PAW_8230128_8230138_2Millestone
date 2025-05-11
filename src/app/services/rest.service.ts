import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../model/perfil/user';

const endPoint = 'http:localhost:3000/api/v1';
const httpOptions = {
  heafers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getUser(userId:String): Observable<User> {
    return this.http.get<User>(endPoint + '/user/' + userId);
  }
}

