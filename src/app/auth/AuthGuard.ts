import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/cokkies/cookies-service.service';

@Injectable({ providedIn: 'root'}) 
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const routeUserId = route.paramMap.get('userId');
        return this.authService.checkAut().pipe(
            map((res) => {
                if (res.isAuth && res.userId === routeUserId) {
                    console.log('Utilizador autenticado:', res.userId);
                    return true;
                } else {
                    console.warn('Acesso negado: ID diferente ou não autenticado');
                    if (typeof window !== 'undefined') {
                        window.location.href = 'http://localhost:3000';
                    }

                    return false;
                }
            }),
            catchError(() => {
                if (typeof window !== 'undefined') {
                    window.location.href = 'http://localhost:3000';
                }
                return of(false);
            })
        );
    }
}