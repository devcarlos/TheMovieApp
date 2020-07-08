import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from './../interfaces/movie';
import { Result } from './../interfaces/result';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private API_HOST = 'https://api.themoviedb.org/';
  private API_KEY = 'af44e351eba4d21316a7fbc75f41375d';
  private ENDPOINT = `${this.API_HOST}/3/movie/popular?api_key=${this.API_KEY}`;

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    const path = this.ENDPOINT;
    return this.http.get<Result[]>(path);
  }
}
