import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { Blog } from '../models/models';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";
import { Loading } from "../loading/loading";

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, MarkdownComponent, Loading],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss'
})
export class BlogDetails implements OnInit {
  loading = true;
  blog: Blog | null = null;
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog() {
    var id = this.blogService.getId();
    if (id == 0) {
      this.router.navigate(['/home']);
      return;
    }
    this.blogService.getBlogById(id).subscribe({
      next: (res: Blog) => {
        this.blog = res;
        this.loading = false;
      },
      error: (err) => {
        console.log('Eror getting blog details', err);
        this.loading = false;
      }
    })
  }


}
