import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar'; // Ensure Toolbar is a standalone component
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

declare var gtag: (...args: any[]) => void;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'BearlyBlogging_Front';

  constructor(private router: Router) {
    // Subscribe to router events to track page views with Google Analytics
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      gtag('config', 'G-89D9H9VN85', {
        'page_path': event.urlAfterRedirects
      });
    });
  }

  showToolbar(): boolean {
    return !['/login', '/register', '/'].includes(this.router.url);
  }
}