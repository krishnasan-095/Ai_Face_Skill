import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashborad-home',
  standalone: true,
  imports: [],
  templateUrl: './dashborad-home.component.html',
  styleUrl: './dashborad-home.component.css'
})
export class DashboradHomeComponent {

  constructor(public router: Router, public api: ServiceService) { }

  userId: any
  overAllScoreS: any
  TopFiveVideoScores: any


  ngOnInit() {
    this.userId = localStorage.getItem('PC-UID');
    this.getAllscore()
  }

  getAllscore() {
    this.api.getAllScore(this.userId).subscribe({
      next: (res => {
        console.log(res);
        this.overAllScoreS = res;
        this.gettopFivescore();
      }), error: (err => {
        console.log(err);
      })
    })
  }

  gettopFivescore() {
    this.api.getTopFiveRank(this.userId).subscribe({
      next: (res => {
        console.log(res);
        this.TopFiveVideoScores = res;
      }), error: (err => {
        console.log(err);
      })
    })
  }

  navigate(data: any) {
    this.router.navigate(['/Video/' + data])
  }

}
