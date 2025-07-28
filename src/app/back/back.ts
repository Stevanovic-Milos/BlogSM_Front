import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-back',
  imports: [MatIcon],
  templateUrl: './back.html',
  styleUrl: './back.scss'
})
export class Back {

  onBack() {
    window.history.back();
  }

}
