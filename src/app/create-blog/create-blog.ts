import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateBlogRequest, MyResponse } from '../models/models';
import { BlogService } from '../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-blog',
  imports: [MatInput, ReactiveFormsModule, MatFormFieldModule,MatButtonModule],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss'
})
export class CreateBlog {
  constructor(private blogService: BlogService, private toastr:ToastrService, private router: Router){}

  create_blog_form = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  onsubmit() {
    const formValue = this.create_blog_form.value;
    const createBlog: CreateBlogRequest = {
      title: formValue.title ?? '',
      category: formValue.category ?? '',
      imageUrl: formValue.imageUrl ?? '',
      content: formValue.content ?? ''
    };
    this.blogService.createBlog(createBlog).subscribe({
      next:(res: MyResponse)=>{
        if(res.success==true){
          this.toastr.success(res.message,'SUCESS');
          this.router.navigate(['/home']);
        }
      },
      error:(err)=>{
        console.log('ERROR while saving blog', err);
      }
    })
  }
}
