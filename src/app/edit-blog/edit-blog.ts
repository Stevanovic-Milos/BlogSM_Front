import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { BlogService } from '../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Blog, CreateBlogRequest, MyResponse } from '../models/models';

@Component({
  selector: 'app-edit-blog',
  imports: [MatInput, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './edit-blog.html',
  styleUrl: './edit-blog.scss'
})
export class EditBlog implements OnInit {
  id = 0;

  constructor(private blogService: BlogService, private toastr: ToastrService, private router: Router) { }

  edit_blog_form = new FormGroup({
    title: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),

  })

  ngOnInit() {
    this.id = this.blogService.getId();
    this.getBlogData();
  }

  onsubmit() {
    const formValue = this.edit_blog_form.value;
    const editBlog: CreateBlogRequest = {
      id: this.id,
      title: formValue.title ?? '',
      category: formValue.category ?? '',
      imageUrl: formValue.imageUrl ?? '',
      content: formValue.content ?? ''
    };
    this.blogService.editBlog(editBlog).subscribe({
      next: (res: MyResponse) => {
        if (res.success) {
          this.toastr.success(res.message, 'Sucess');
        }
        this.router.navigate(['/my-blogs']);
      },
      error: (err) => {
        console.log('Error while editing blog', err);
      }
    })

  }

  getBlogData() {
    if (this.id == 0) {
      this.router.navigate(['/my-blogs']);
      return;
    }
    this.blogService.getBlogById(this.id).subscribe({
      next: (res: Blog) => {
        this.edit_blog_form.setValue({
          title: res.title,
          imageUrl: res.imageUrl,
          category: res.category,
          content: res.content
        })
      },
      error: (err) => {
        console.log('Error while geting blog', err);
      }
    })
  }


}
