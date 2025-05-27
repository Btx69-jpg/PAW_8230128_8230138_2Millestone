import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
export class CommentService {

  constructor(private http: HttpClient) {}

  /**
   * * Post para o utilizador criar um comentario
   */
  postComment(userId: String, formData: FormData): Observable<void> {
    return this.http.post<void>(`${endPoint}/${userId}/historicOrder/createComment`, formData);
  }

  /**
   * * Permite eliminar um comentario.
   */
  deleteComment(userId: String, orderId: String): Observable<void> {
    return this.http.delete<void>(`${endPoint}/${userId}/historicOrder/${orderId}`);
  }
}
