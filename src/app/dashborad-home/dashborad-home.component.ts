import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashborad-home',
  standalone: true,
  imports: [],
  templateUrl: './dashborad-home.component.html',
  styleUrl: './dashborad-home.component.css'
})
export class DashboradHomeComponent {

  constructor(public router: Router) { }

  ngOnInit() {

  }

  navigate(data: any) {
    this.router.navigate(['/Video/' + data])
  }
  
}
