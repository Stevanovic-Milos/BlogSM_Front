import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  imports: [MatIcon],
  templateUrl: './back.html',
  styleUrl: './back.scss'
})
export class Back {
  @Input() route: string | null = null;
  constructor(private router: Router) { }

  onBack() {
    if (this.route) {
      this.router.navigate([`${this.route}`])
    }
    else {
      window.history.back();
    }
  }

}
