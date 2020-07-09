export interface Movie {
  popularity: Number
  vote_count: Number
  video: Boolean
  like: Boolean
  poster_path: string
  id: Number
  adult: Boolean
  backdrop_path: string
  original_language: string
  original_title: string
  genre_ids: Number[]
  title: string
  vote_average: Number
  overview: string
  release_date: Date
  imageURL: string
}
