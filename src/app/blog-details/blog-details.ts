import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../models/models';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from "ngx-markdown";
import { Loading } from "../loading/loading";
import { Back } from "../back/back";
import { NoBlogs } from "../no-blogs/no-blogs";
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, MarkdownComponent, Loading, Back, NoBlogs],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.scss'
})
export class BlogDetails implements OnInit {
  loading = true;
  blog: Blog | null = null;
  constructor(private blogService: BlogService, private router: Router, private route: ActivatedRoute, private analytics: AnalyticsService) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog() {
    var id = this.route.params.subscribe(parms => {
      const id = +parms['id'];

      if (id == 0) {
        this.router.navigate(['']);
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
      this.analytics.trackEvent("blog loaded", `blog with id ${id}`, "blog loaded");
    })

  }


}
