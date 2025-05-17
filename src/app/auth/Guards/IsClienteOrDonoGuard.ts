import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserPriority } from '../UserPriority';

@Injectable({ providedIn: 'root' })
export class IsClienteOrDonoGuard implements CanActivate {
    constructor(private priority: UserPriority, private router: Router) {}

    canActivate(): boolean {
        if (this.priority.isClienteOrDono()) {
            return true;
        }

        if (typeof window !== 'undefined') {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'http://localhost:3000'; // ou tua rota de fallback
            }
        }
        
        return false;
    }
}
