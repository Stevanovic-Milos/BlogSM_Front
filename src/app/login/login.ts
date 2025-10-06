import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { loginRequest, loginResponse } from '../models/models';
import { Back } from "../back/back";

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, ReactiveFormsModule, Back],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loading = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.redirectToHome();
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  redirectToHome(){
    if(this.cookieService.get('auth_token')){
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    const loginData = this.loginForm.value;
    if (!loginData.username || !loginData.password) {
      this.toastr.warning('Username and Password are mandatory', 'WARNING');
      return;
    }

    this.loading = true;

    const loginRequest: loginRequest = {
      username: loginData.username!,
      password: loginData.password!
    }
    this.authService.login(loginRequest).subscribe({
      next: (response: loginResponse) => {
        this.cookieService.set('auth_token', response.token);
        this.toastr.success('Login sucessful', 'SUCESS');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('Error', error);
      }
    })
  }

  onRegister() {
    this.router.navigateByUrl('/register')
  }

}
