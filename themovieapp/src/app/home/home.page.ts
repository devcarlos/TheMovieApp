import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {
  }

  logout() {
    //TODO: handle logout here
    console.log("navigate to login");
    this.router.navigate(['/login'])
  }

  get givenName() {
    //TODO: handle storage
    return "Carlos Alcala";
  }
}
