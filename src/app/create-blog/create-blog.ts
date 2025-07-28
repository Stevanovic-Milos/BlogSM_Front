import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateBlogRequest, MyResponse } from '../models/models';
import { BlogService } from '../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Loading } from "../loading/loading";
import { CommonModule } from '@angular/common';
import { Back } from "../back/back";

@Component({
  selector: 'app-create-blog',
  imports: [MatInput, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, Loading, CommonModule, Back],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss'
})
export class CreateBlog {
  loading = false;
  constructor(private blogService: BlogService, private toastr: ToastrService, private router: Router) { }

  create_blog_form = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  onsubmit() {
    this.loading = true;
    const formValue = this.create_blog_form.value;
    const createBlog: CreateBlogRequest = {
      title: formValue.title ?? '',
      category: formValue.category ?? '',
      imageUrl: formValue.imageUrl ?? '',
      content: formValue.content ?? ''
    };

    this.blogService.createBlog(createBlog).subscribe({
      next: (res: MyResponse) => {
        if (res.success == true) {
          this.loading = false;
          this.toastr.success(res.message, 'SUCESS');
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log('ERROR while saving blog', err);
        this.loading = false;
      }
    })
  }
}
