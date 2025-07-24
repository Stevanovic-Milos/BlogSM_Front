import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { loginRequest, loginResponse, RegisterRequest } from '../models/models';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [MatFormField, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private toastr: ToastrService

  ) { }
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  })

  onSubmit() {
    const registerData = this.registerForm.value;
    if (!registerData.username || !registerData.password || !registerData.name || !registerData.surname || !registerData.email) {
      console.log('Dataaa', registerData)
      this.toastr.warning('All fiealds must be filled', 'WARNING')
      return;
    }

    const registerRequest: RegisterRequest = {
      username: registerData.username!,
      password: registerData.password!,
      name: registerData.name!,
      surname: registerData.surname!,
      email: registerData.email!
    }

    this.loading = true;
    this.authService.register(registerRequest).subscribe({
      next: (response: loginResponse) => {
        console.log('RESPONSE', response);
        if (response.success && response.token == 'signed-up') {
          const request: loginRequest = {
            username: registerRequest.username,
            password: registerRequest.password
          }
          this.onLogin(request)
        }

        if (!response.success && response.token == 'username-exists') {
          this.toastr.warning('This username already exsists, pleas try another one', 'WARNING')
        }

        if (!response.success && response.token == 'email-exists') {
          this.toastr.warning('This email is already in use, pleas try another one or login', 'WARNING')
        }
      },
      error: (error) => {
        this.loading = false;
        console.log('Error', error);
      }

    });

  }

  onLogin(request: loginRequest) {
    this.authService.login(request).subscribe({
      next: (response: loginResponse) => {
        this.cookieService.set('auth_token', response.token);
        this.toastr.success('Login sucessful', 'SUCESS');
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log('Error', error);
        this.toastr.error('Something went wrong', 'ERROR');
      }
    })
  }

  onLoginRoute() {
    this.router.navigateByUrl('/login')
  }

}
