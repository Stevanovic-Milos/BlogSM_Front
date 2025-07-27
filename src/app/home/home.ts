import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/models';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";
import { Router, RouterModule } from '@angular/router';
import { Loading } from "../loading/loading";

@Component({
  selector: 'app-home',
  imports: [CommonModule, MarkdownComponent, Loading],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  blogs: Blog[] | null = null;
  newestblog: Blog | null = null;
  loading = true

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
  onBlogDetails(id: number) {
    console.log('IDDDDDDD', id)
    this.blogService.setId(id);
    this.router.navigate(['/blog-details']);
  }

}
