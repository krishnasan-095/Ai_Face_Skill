import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashborad';
  pathUrl: any;
  userId: any

  constructor(public router: Router) {
    this.userId = localStorage.getItem('PC-UID')
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.pathUrl = this.router.url.split('/')[2];
        console.log(this.pathUrl);
      }
    });
  }

  navigate(data: any) {
    this.router.navigate(['/' + data])
  }
}
