import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Storage } from '@ionic/storage';

import { Movie } from "./../interfaces/movie";
import { Result } from "./../interfaces/result";

const MOVIES_KEY = 'com.movies.storage';

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

  constructor(private storage: Storage, private http: HttpClient) {}

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
  fetchData() {
    //return response from request
    return this.request();
  }

  // GET MOVIES DATA - SETUP LOCAL STORAGE
  getMoviesData(): Promise<any> {
    return this.storage.get(MOVIES_KEY).then(async (movies: Movie[]) => {
      if (movies && movies.length > 0) {
        console.log('retrieving movies from LOCAL STORAGE');
        this.movies = movies
        return this.storage.set(MOVIES_KEY, this.movies);
      } else {
        console.log('retrieving movies from API');
        this.movies = await this.retrieveMovies();
        return this.storage.set(MOVIES_KEY, this.movies);
      }
    });
  }

  // GET MOVIES FROM LOCAL STORAGE
  getMovies(): Promise<Movie[]> {
    return this.getMoviesData()
  }

  // RETRIEVE MOVIES FROM API
  async retrieveMovies(): Promise<Movie[]> {
    //return a Promise of Movie array
    return await new Promise<Movie[]>((resolve, reject) => {

      //fetch DATA from API
      this.fetchData().subscribe(
        async (result: Result) => {
          console.log(result);
          let results = result.results;

          // Update Movies result image URL
          let movies = results.map((movie) => {
            let path = movie.poster_path;
            let size = "w342";
            let imageURL = `${this.IMAGE_HOST}/${size}/${path}`;

            movie.imageURL = imageURL;
            return movie;
          });

          console.log("MOVIES => ", movies);

          resolve(movies);
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
