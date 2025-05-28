import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/cokkies/cookies-service.service';

@Injectable({ providedIn: 'root'}) 
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.authService.checkAut().subscribe({
                next: (authRes) => {
                    if (authRes.isAuth) {
                        observer.next(true);
                    } else {
                        this.redirectFallback();
                        observer.next(false);
                    }
                    observer.complete();
                },
                error: () => {
                    this.redirectFallback();
                    observer.next(false);
                    observer.complete();
                }
            });
        });
    }

    private redirectFallback(): void {
        if (typeof window !== 'undefined') {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'http://localhost:3000';
            }
        }
    }
}