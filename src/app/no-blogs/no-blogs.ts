import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-blogs',
  imports: [],
  templateUrl: './no-blogs.html',
  styleUrl: './no-blogs.scss'
})
export class NoBlogs {
  @Input() message = 'Not even a bear could dig up blogs here.';
}
