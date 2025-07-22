import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [MatFormField,MatInputModule,ReactiveFormsModule,MatButton],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('',Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email)
  })

  onSubmit(){

  }

}
