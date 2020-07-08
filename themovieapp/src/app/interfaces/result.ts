import { Movie } from './movie';

export interface Result {
  page: Number
  total_results: Number
  total_pages: Number
  results: Movie[]
}
