import { Observable } from "rxjs";
import { environment } from "../environments/envirnoment";
import { DataService } from "../services/data.service";
import { MyResponse, User } from "../models/models";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class userDetailsService {
    private apiUrl = environment.apiUrl + '/UserDetails'

    constructor(private dataService: DataService) { }

    getUserDetails(): Observable<User> {
        return this.dataService.get(this.apiUrl);
    }

    upateUser(user: User): Observable<MyResponse> {
        return this.dataService.post(this.apiUrl + '/update', user);
    }
}