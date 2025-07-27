import { Component, OnInit } from '@angular/core';
import { userDetailsService } from './userDetails.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/models';
import { CookieService } from 'ngx-cookie-service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Loading } from "../loading/loading";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-details',
  imports: [MatButton, MatIcon, Loading, CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails implements OnInit {
  user: User | null = null;
  loading = true;
  constructor(private userDetailsService: userDetailsService, private router: Router, private toastr: ToastrService, private cookieService: CookieService, private authService: AuthService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userDetailsService.getUserDetails().subscribe({
      next: (res: User) => {
        this.user = res;
        this.loading = false;
      },
      error: (err) => {
        console.log("Error fetching user details", err);
        this.loading = false;
      }
    })
  }
  
  onLogout() {
    this.authService.onLogout();
  }

  onEdit() {
    this.router.navigate(['/edit-user'])
  }

}
