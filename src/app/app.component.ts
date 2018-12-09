import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Compound';

  isActive(item) {
    if (window.location.href.includes(item)) {
      return true;
    }
    return false;
  }
}
