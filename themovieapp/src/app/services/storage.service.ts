import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Movie } from "./../interfaces/movie";
import { Result } from "./../interfaces/result";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  response: Observable<Result>;
  movies: Movie[] = [];
  result: Result = null;

  private API_HOST = "https://api.themoviedb.org/";
  private IMAGE_HOST = "https://image.tmdb.org/t/p/";
  private ENDPOINT = `${this.API_HOST}3/movie/popular?api_key=API_KEY`;
  // private ENDPOINT = `${this.API_HOST}3/movie/popular?api_key=API_KEY${this.API_KEY}`;

  constructor(private http: HttpClient) {}

  //REQUEST HTTP CALL
  request() {
    //HTTP Callback to API endpoint
    this.response = this.http.get<Result>(this.ENDPOINT);
    return this.response;
  }

  // DATA LOAD FOR TESTING
  load() {
    this.http.get("assets/data/results.json").subscribe((data: Result) => {
      console.log('RESULTS => ', data);
      this.result = data;
    });
  }

  // GET DATA 
  getData() {
    //return response from request
    return this.request();
  }

  // READ MOVIES
  async getMovies(): Promise<Movie[]> {
    //return a Promise of Movie array
    return await new Promise<Movie[]>((resolve, reject) => {
      //check movies in local storage
      if (this.movies && this.movies.length > 0) {
        resolve(this.movies);
        return;
      }

      //retrieve movies from API
      this.getData().subscribe(
        async (result: Result) => {
          console.log(result);
          let results = result.results;

          // Update Movies image URL
          this.movies = results.map((movie) => {
            let path = movie.poster_path;
            let size = "w342";
            let imageURL = `${this.IMAGE_HOST}/${size}/${path}`;

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

  // READ MOVIE BY ID
  getMovie(movieId: Number) {
    return {
      ...this.movies.find((movie) => {
        return movie.id === movieId;
      }),
    };
  }
}
