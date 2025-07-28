import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Toolbar } from "./toolbar/toolbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'BearlyBlogging_Front';

  constructor(private router: Router) { }

  showToolbar(): boolean {
    return this.router.url == '/login' ||
      this.router.url == '/register' ||
      this.router.url == '/'
  }
}
