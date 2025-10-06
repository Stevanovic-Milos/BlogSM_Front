import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { AuthGUad } from './services/authGuard.service';
import { BlogDetails } from './blog-details/blog-details';
import { CreateBlog } from './create-blog/create-blog';
import { MyBlogs } from './my-blogs/my-blogs';
import { EditBlog } from './edit-blog/edit-blog';
import { UserDetails } from './user-details/user-details';
import { EditUser } from './edit-user/edit-user';

export const routes: Routes = [
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '/', component: Home },
    { path: 'blog-details/:id', component: BlogDetails },
    { path: 'create-blog', component: CreateBlog, canActivate: [AuthGUad] },
    { path: 'my-blogs', component: MyBlogs, canActivate: [AuthGUad] },
    { path: 'edit-blog/:id', component: EditBlog, canActivate: [AuthGUad] },
    { path: 'user-details', component: UserDetails, canActivate: [AuthGUad] },
    { path: 'edit-user', component: EditUser, canActivate: [AuthGUad] }
];
