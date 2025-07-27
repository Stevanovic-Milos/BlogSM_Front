import { Component, OnInit } from '@angular/core';
import { userDetailsService } from './userDetails.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/models';
import { CookieService } from 'ngx-cookie-service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { f } from "../../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-details',
  imports: [MatButton, MatIcon],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails implements OnInit {
  user: User | null = null
  constructor(private userDetailsService: userDetailsService, private router: Router, private toastr: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userDetailsService.getUserDetails().subscribe({
      next: (res: User) => {
        this.user = res;
      },
      error: (err) => {
        console.log("Error fetching user details", err);
      }
    })
  }
  onLogout() {
    if (confirm('Logout?')) {
      this.cookieService.delete('auth_token');
      this.router.navigate(['/login']);
    }
  }
  onEdit() {
    this.router.navigate(['/edit-user'])
  }

}
