import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/models';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";
import { Router, RouterModule } from '@angular/router';
import { Loading } from "../loading/loading";
import { NoBlogs } from "../no-blogs/no-blogs";

@Component({
  selector: 'app-home',
  imports: [CommonModule, MarkdownComponent, Loading, NoBlogs],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  blogs: Blog[] | null = null;
  newestblog: Blog | null = null;
  loading = true;
  imageLoaded = false;


  constructor(private toastr: ToastrService, private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (res: Blog[]) => {
        this.blogs = res;
        this.newestblog = res[0];
        this.loading = false;
      },
      error: (err) => {
        console.log('Eror while retriving all blogs', err);
        this.loading = false;
      }
    })
  }
  onImageLoad() {
    this.imageLoaded = true;
  }

  onBlogDetails(id: number) {
    this.router.navigate([`/blog-details/${id}`]);
  }

}
