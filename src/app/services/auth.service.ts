import { loginRequest, loginResponse, RegisterRequest } from "../models/models";
import { DataService } from "./data.service";
import { environment } from "../environments/envirnoment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl + '/auth';

    constructor(
        private data: DataService,
        private cookieService: CookieService,
        private router: Router
    ) { }

    login(body: loginRequest): Observable<loginResponse> {
        return this.data.post(this.apiUrl + '/login', body);
    }

    register(body: RegisterRequest): Observable<loginResponse> {
        return this.data.post(this.apiUrl + '/register', body);
    }

    onLogout() {
        if (confirm('Logout?')) {
            this.cookieService.delete('auth_token');
            this.router.navigate(['/login']);
        }
    }

}