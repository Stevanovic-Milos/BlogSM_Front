import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateBlogRequest, MyResponse } from '../models/models';
import { BlogService } from '../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Loading } from "../loading/loading";
import { CommonModule } from '@angular/common';
import { Back } from "../back/back";
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-create-blog',
  imports: [MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, Loading, CommonModule, Back, MarkdownComponent],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss'
})
export class CreateBlog implements OnInit {
  loading = false;
  preview = false;
  previewText = "";

  constructor(private blogService: BlogService, private toastr: ToastrService, private router: Router) { }

  create_blog_form = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  ngOnInit() {
    // smao jedna subskripcija uvek
    const contentCtrl = this.create_blog_form.get('content');
    if (contentCtrl) {
      contentCtrl.valueChanges.subscribe(value => {
        console.log('valueChanges fired:', value);
        if (this.preview) {
          this.previewText = value ?? '';
        }
      });
    }
  }

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
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.log('ERROR while saving blog', err);
        this.loading = false;
      }
    })
  }

  onPreview() {
    this.preview = true;
    this.previewText = this.create_blog_form.get('content')?.value ?? '';

  }

  noPreview() {
    this.preview = false;
  }
}
