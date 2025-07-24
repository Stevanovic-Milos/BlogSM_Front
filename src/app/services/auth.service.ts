import { loginRequest, loginResponse, RegisterRequest } from "../models/models";
import { DataService } from "./data.service";
import { environment } from "../environments/envirnoment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl + '/auth';

    constructor(
        private data: DataService
    ) { }

    login(body: loginRequest): Observable<loginResponse> {
        return this.data.post(this.apiUrl + '/login', body);
    }

    register(body: RegisterRequest): Observable<loginResponse> {
        return this.data.post(this.apiUrl + '/register', body);
    }
}