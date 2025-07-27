import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MyResponse, User } from '../models/models';
import { userDetailsService } from '../user-details/userDetails.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Loading } from "../loading/loading";

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, MatInput, MatFormFieldModule, MatButtonModule, CommonModule, Loading],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUser implements OnInit {
  private user: User | null = null;
  loading = true;

  user_form = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })

  constructor(private userDetailsService: userDetailsService, private router: Router, private toastr: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userDetailsService.getUserDetails().subscribe({
      next: (res: User) => {
        this.user_form.setValue({
          username: res.username,
          firstName: res.firstname,
          lastName: res.lastname,
          email: res.email
        })
        this.loading = false;
      },
      error: (err) => {
        console.log('Error while getting user details', err)
        this.loading = false;
      }
    })
  }

  onSubmit() {
    var form = this.user_form.value;
    this.user = {
      username: form.username ?? '',
      firstname: form.firstName ?? '',
      lastname: form.lastName ?? '',
      email: form.email ?? '',
    };

    this.userDetailsService.upateUser(this.user).subscribe({
      next: (res: MyResponse) => {
        if (res.success) {
          this.toastr.success('User updated', 'Sucess')
        }
        this.cookieService.delete('auth_token');
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log('Error updating user', err);
      }
    })
  }


}
