import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { Movie } from "../../interfaces/movie";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie: Movie = <Movie>{};
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const movieId = paramMap.get("movieId");
      console.log('MOVIE ID => ', movieId);
      this.movie = this.storageService.getMovie(Number(movieId));
    });
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: this.movie.like ? 'Dislike this Movie?' : 'Like this Movie?',
      message: this.movie.like ? 'Are you sure you want dislike this Movie 💔 ?' : 'Are you sure you want like this Movie ❤️ ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel: Nothing to do with Movie...');
          }
        }, {
          text: this.movie.like ? 'Dislike' : 'Like',
          handler: () => {
            console.log('Confirm: Updating Movie...');
            this.likeMovie()
          }
        }
      ]
    });

    await alert.present();
  }

  likeMovie() {
    this.movie.like = !this.movie.like
    console.log('Movie Like updated => ', this.movie.like);
  }
}
