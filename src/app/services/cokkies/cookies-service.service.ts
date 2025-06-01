import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

const endPoint = 'http://localhost:3000/api/v1/check';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

interface AuthCheckResponse {
  isAuth: boolean;
  userId?: String;
  priority?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  checkAut(userId: string): Observable<AuthCheckResponse> {
    return this.http.get<AuthCheckResponse>(`${endPoint}/auth/${userId}`, {withCredentials: true})
    .pipe(
      catchError(() => of({ isAuth: false }))
    );
  }

  checkisDonoOrCliente(): Observable<string> {
    return this.http.get<{ priority: string }>(`${endPoint}/authIsDonoOrCliente`, {withCredentials: true})
    .pipe(
      map(res => res.priority)
    );
  }
}
