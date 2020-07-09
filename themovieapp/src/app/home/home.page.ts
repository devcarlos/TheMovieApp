import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private toastController: ToastController) {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `You are logged in as ${this.givenName()}`,
      duration: 2000
    });
    toast.present();
  }

  logout() {
    //TODO: handle logout here
    console.log("navigate to login");
    this.router.navigate(['/login'])
  }

  goToMovies() {
    console.log("navigate to movies");
    this.router.navigate(['/movies'])
  }

  ionViewDidEnter() {
    this.presentToast()
  }

  givenName() {
    return "Carlos Alcala";
  }
}
