import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BlogService } from '../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Blog, CreateBlogRequest, MyResponse } from '../models/models';
import { Loading } from "../loading/loading";
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";


@Component({
  selector: 'app-edit-blog',
  imports: [MatInput, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, Loading, CommonModule, MarkdownComponent],
  templateUrl: './edit-blog.html',
  styleUrl: './edit-blog.scss'
})
export class EditBlog implements OnInit {
  id = 0;
  loading = true;
  preview = false;
  previewText = "";

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

    //jedna subskripcija
    const contentCtrl = this.edit_blog_form.get('content');
    if (contentCtrl) {
      contentCtrl.valueChanges.subscribe(value => {
        if (this.preview) {
          this.previewText = value ?? '';
        }
      });
    }

  }

  onsubmit() {
    this.loading = true;
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
          this.loading = false
        }
        this.router.navigate(['/my-blogs']);
      },
      error: (err) => {
        console.log('Error while editing blog', err);
        this.loading = false;
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
        this.loading = false;

      },
      error: (err) => {
        console.log('Error while geting blog', err);
        this.loading = false;
      }
    })
  }

  onPreview() {
    this.preview = true;
    this.previewText = this.edit_blog_form.get('content')?.value ?? '';
  }

  noPreview() {
    this.preview = false;
  }
}
