import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('email') email: any;
  private username: string;
  private password: string;

  ngOnInit() {
  }

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
    ) {}

  ionViewDidEnter() {
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  //LOGIN
  login(): void {
    //TODO: handle login here
    console.log("username: ", this.username);
    console.log("password: ", this.password);

    if (this.username === 'mojix' && this.password === 'test123') {
      console.log("navigate to home");
      this.router.navigate(['/home']);
    } else {
      this.presentToast('Wrong credentials please try again!', 'warning');
    }
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      color: color,
      duration: 3000
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..'
    });
    await loading.present();
    return loading;
  }
}