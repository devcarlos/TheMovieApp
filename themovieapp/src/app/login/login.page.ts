import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('email') email: any;

  ngOnInit() {
  }

  constructor(private router: Router) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  //LOGIN
  login(): void {
    //TODO: handle login here
    console.log("navigate to home");
    this.router.navigate(['/home'])
  }
}