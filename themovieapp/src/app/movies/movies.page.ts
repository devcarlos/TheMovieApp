import { Component, OnInit } from '@angular/core';

import { AlertController, ToastController, LoadingController } from '@ionic/angular';

import { StorageService } from './../services/storage.service';
import { Result } from './../interfaces/result';
import { Movie } from './../interfaces/movie';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: Movie[] = [];

  constructor(
    private storageService: StorageService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.presentLoading();
    await this.storageService.getMovies()
    .then((movies: Movie[]) => {
      this.movies = movies;
      loading.dismiss();
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Movies..'
    });
    await loading.present();
    return loading;
  }
}
