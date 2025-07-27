import { Injectable } from "@angular/core";
import { environment } from "../environments/envirnoment";
import { DataService } from "./data.service";
import { Observable } from "rxjs";
import { Blog, CreateBlogRequest, MyResponse } from "../models/models";

@Injectable({ providedIn: 'root' })

export class BlogService {

    private apiUrl = environment.apiUrl + '/blogs'
    protected apiAuth = environment.apiUrl
    blog_id = 0

    constructor(private dataService: DataService) { }

    setId(id: number) {
        this.blog_id = id;
    }
    getId() {
        return this.blog_id;
    }

    getAllBlogs(): Observable<Blog[]> {
        return this.dataService.get(this.apiUrl);
    }
    getBlogById(id: number): Observable<Blog> {
        return this.dataService.post(this.apiUrl + '/id', id);
    }
    createBlog(blog: CreateBlogRequest): Observable<MyResponse> {
        return this.dataService.post(this.apiAuth + '/create', blog);
    }
    getAllBlogsCreatedByMe(): Observable<Blog[]> {
        return this.dataService.get(this.apiAuth + '/my-blogs');
    }
    deleteBlog(id: number): Observable<MyResponse> {
        return this.dataService.post(this.apiAuth + '/delete', id);
    }
    editBlog(blog: CreateBlogRequest): Observable<MyResponse>{
        return this.dataService.post(this.apiAuth + '/edit', blog);
    }
}