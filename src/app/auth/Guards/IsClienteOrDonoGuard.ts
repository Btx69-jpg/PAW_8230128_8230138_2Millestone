import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/cokkies/cookies-service.service';


@Injectable({ providedIn: 'root' })
export class IsClienteOrDonoGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.authService.checkisDonoOrCliente().subscribe({
                next: (role: string) => {
                    if (role === 'Dono' || role === 'Cliente') {
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
