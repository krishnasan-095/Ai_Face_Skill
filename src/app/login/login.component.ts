import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public api: ServiceService, public router: Router) {

  }


  login() {
    const Mail: any = document.getElementById('Mail')
    const Mobile: any = document.getElementById('Mobile')

    let post = {
      'mail': Mail.value,
      'Mobile': Mobile.value
    }

    // this.api.login(post).subscribe({
    //   next: (res => {
    //     console.log(res);
    //     this.router.navigate(['/dashboard'])
    //   }), error: (err => {
    //     console.log(err);
    //   })
    // })
    setTimeout(() => {
      this.router.navigate(['/dashboard'])
    }, 3000)
  }


}
