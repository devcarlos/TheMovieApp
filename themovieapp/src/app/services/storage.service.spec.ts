import { TestBed, inject, async } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { StorageService } from './storage.service';
import { MoviesPage } from '../movies/movies.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

let storageService: StorageService = null;
let httpMock: HttpTestingController = null;

describe("Provider: StorageService", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesPage],
      imports: [HttpClientTestingModule],
      providers: [StorageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    storageService = TestBed.inject(StorageService);
    httpMock  = TestBed.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it("should have response and movies result", () => {
      const mockResponse = {
        "page": 1,
        "total_results": 10000,
        "total_pages": 500,
        "results": [
            {
                "popularity": 333.827,
                "vote_count": 1839,
                "video": false,
                "poster_path": "/s1cVTQEZYn4nSjZLnFbzLP0j8y2.jpg",
                "id": 8619,
                "adult": false,
                "backdrop_path": "/m11Mej9vbQqcXWgYrgPboCJ9NUh.jpg",
                "original_language": "en",
                "original_title": "Master and Commander: The Far Side of the World",
                "genre_ids": [
                    12,
                    18,
                    10752
                ],
                "title": "Master and Commander: The Far Side of the World",
                "vote_average": 7.1,
                "overview": "After an abrupt and violent encounter with a French warship inflicts severe damage upon his ship, a captain of the British Royal Navy begins a chase over two oceans to capture or destroy the enemy, though he must weigh his commitment to duty and ferocious pursuit of glory against the safety of his devoted crew, including the ship's thoughtful surgeon, his best friend.",
                "release_date": "2003-11-14"
            }
          ]
      };

      expect(storageService).toBeTruthy();

      //load mock data for testing
      storageService.load();

      // Expect a request to the URL
      const mockReq = httpMock.expectOne("assets/data/results.json");

      // Execute the request using the mockResponse data
      mockReq.flush(mockResponse);

      expect(storageService.result).toBeTruthy();
      expect(storageService.result.results.length).toBeGreaterThan(0);
      expect(storageService.result.results[0].popularity).toBe(333.827);
    }
  );
});
