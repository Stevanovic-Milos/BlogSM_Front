import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})

export class AuthGUad implements CanActivate {

    constructor(
        private cookieService: CookieService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.cookieService.get('auth_token')) {
            return true
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}