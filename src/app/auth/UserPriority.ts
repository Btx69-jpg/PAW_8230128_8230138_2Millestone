import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: 'root'})
export class UserPriority {
    constructor(private cookieService: CookieService) {}

    getUserRole(): string | null {
        const priority = this.cookieService.get('priority');
        return priority;
    }

    isCliente(): boolean {
        let corretype: boolean = false;
        const priority = this.getUserRole();
        
        if (priority === "Cliente") {
            corretype = true;
        }

        return corretype;
    }

    isDono(): boolean {
        let corretype: boolean = false;
        const priority = this.getUserRole();
        
        if (priority === "Dono") {
            corretype = true;
        }

        return corretype;
    }

    isRestaurant(): boolean {
        let corretype: boolean = false;
        const priority = this.getUserRole();
        
        if (priority === "Restaurant") {
            corretype = true;
        }

        return corretype;
    }

    isAdmin(): boolean {
        let corretype: boolean = false;
        const priority = this.getUserRole();
        
        if (priority === "Admin") {
            corretype = true;
        }

        return corretype;
    }

    isClienteOrDono(): boolean {
        let corretype: boolean = false;
        const priority = this.getUserRole();
        
        if (priority === "Cliente" || priority === "Dono") {
            corretype = true;
        }

        return corretype;
    }
}