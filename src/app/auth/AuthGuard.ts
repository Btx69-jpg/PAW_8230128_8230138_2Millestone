import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root'}) 
export class AuthGuard implements CanActivate {

    constructor(private cookieService: CookieService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const hasToken = this.cookieService.check('auth_token');
        const hasPriority = this.cookieService.check('priority');
        if (hasToken && hasPriority) {
            console.log("Está valido!");
            return true;
        }

        //Testar
        if (typeof window !== 'undefined') {
            window.location.href = 'http://localhost:3000/login';
        }  
        console.log("Token Invalido")
        return false;
    }
}