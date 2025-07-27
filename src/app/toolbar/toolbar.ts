import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  constructor(private cookeiService: CookieService, private router: Router) { }

  isAuth(): boolean {
    if (this.cookeiService.get('auth_token')) {
      return true;
    }
    else {
      return false;
    }
  }
  onUser() {
    if (this.cookeiService.get('auth_token')) {
      this.router.navigate(['/user-details']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
