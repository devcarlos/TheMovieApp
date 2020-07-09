import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { HTTP } from "@ionic-native/http/ngx";

import { Movie } from "./../interfaces/movie";
import { Result } from "./../interfaces/result";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  movies: Movie[] = [];

  private API_HOST = "https://api.themoviedb.org/";
  private IMAGE_HOST = "https://image.tmdb.org/t/p/";
  private API_KEY = "af44e351eba4d21316a7fbc75f41375d";
  private ENDPOINT = `${this.API_HOST}3/movie/popular?api_key=${this.API_KEY}`;

  constructor(private http: HttpClient) {}
  // constructor(private http: HTTP) {}

  getData() {
    const endpoint = this.ENDPOINT;
    return this.http.get<Result>(endpoint);
  }

  // READ MOVIES
  async getMovies(): Promise<Movie[]> {
    return await new Promise<Movie[]>((resolve, reject) => {
      //check movies in local storage
      if (this.movies && this.movies.length > 0) {
        console.log("MOVIES FOUND => TRUE");
        resolve(this.movies);
        return;
      }

      //retrieve movies from API
      this.getData().subscribe(
        async (result: Result) => {
          console.log(result);
          let results = result.results;

          let size = "w342";

          this.movies = results.map((movie) => {
            let path = movie.poster_path;
            let imageURL = `${this.IMAGE_HOST}/${size}/${path}`;
            console.log("PATH => ", path);
            console.log("imageURL => ", imageURL);

            movie.imageURL = imageURL;
            return movie;
          });

          console.log("MOVIES => ", this.movies);

          resolve(this.movies);
        },
        async (error) => {
          console.log("Error =>", error);
          reject(error);
        }
      );
    });
  }

  // READ MOVIE
  getMovie(movieId: Number) {
    return {
      ...this.movies.find((movie) => {
        return movie.id === movieId;
      }),
    };
  }
}
