import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class DataService {
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    private getAuthHeaders(): HttpHeaders {

        const token = this.cookieService.get('auth_token');

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    private handleError(error: HttpErrorResponse) {

        if (error.status == 401) {
            this.router.navigate(['/login']);
        }
        this.toastr.error('Something unexpected happened', 'ERROR');
        return throwError(() => error)
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(url, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError.bind(this)));
    }

    post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(url, body, { headers: this.getAuthHeaders() })
            .pipe(catchError(this.handleError.bind(this)));
    }
}