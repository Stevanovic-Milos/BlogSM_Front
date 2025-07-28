import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Blog, MyResponse } from '../models/models';
import { BlogService } from '../services/blog.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Loading } from "../loading/loading";

@Component({
  selector: 'app-my-blogs',
  imports: [CommonModule, MatIcon, MatButton, Loading],
  templateUrl: './my-blogs.html',
  styleUrl: './my-blogs.scss'
})
export class MyBlogs implements OnInit {
  blogs: Blog[] | null = null;
  loading = true;

  constructor(private blogService: BlogService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.getAllBlogsCreatedByMe();
  }

  onBlogDetails(id: number) {
    this.blogService.setId(id);
    this.router.navigate(['/blog-details']);
  }

  getAllBlogsCreatedByMe() {
    this.blogService.getAllBlogsCreatedByMe().subscribe({
      next: (res: Blog[]) => {
        this.blogs = res;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error while getting my events', err);
        this.loading = false;
      }
    })
  }

  deleteBlog(id: number ) {
    if (confirm('Delete event?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: (res: MyResponse) => {
          if (res.success) {
            this.toastr.success('Event deleted!', 'Sucess');
            this.getAllBlogsCreatedByMe();
          }
        },
        error: (err) => {
          console.log('Error while deleting blog', err);
        }
      })
    }
  }

  editBlog(id: number) {
    this.blogService.setId(id);
    this.router.navigate(['/edit-blog'])
  }

}
