import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-all-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-videos.component.html',
  styleUrl: './all-videos.component.css'
})
export class AllVideosComponent {

  constructor(public router: Router, public api: ServiceService, private app: AppComponent) { }

  allVideos: any = []

  ngOnInit() {
    this.getAllVideos();
  }

  getAllVideos() {
    this.api.getAllvideo(this.app.userId).subscribe({
      next: (res => {
        console.log(res);
        this.allVideos = res
      }), error: (err => {
        console.log(err);
      })
    })
  }


}
