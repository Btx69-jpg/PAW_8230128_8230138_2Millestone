import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceprotServiceService implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //ir há cookie bucar o token
    const hasToken = this.cookieService.check('auth_token');
    const hasPriority = this.cookieService.check('priority');
    if (hasToken && hasPriority) {
      request = request.clone({
        setHeaders: {
          "x-acess-token": `${hasToken}`
        }             
      })
    }

    return next.handle(request);
  }
}
