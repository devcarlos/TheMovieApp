export interface Movie {
  popularity: Number
  vote_count: Number
  video: Boolean
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
}

/*
{
  popularity: 61.22,
  vote_count: 5156,
  video: false,
  poster_path: /db32LaOibwEliAmSL2jjDF6oDdj.jpg,
  id: 181812,
  adult: false,
  backdrop_path: /SPkEiZGxq5aHWQ2Zw7AITwSEo2.jpg,
  original_language: en,
  original_title: Star Wars: The Rise of Skywalker,
  genre_ids: [
      28,
      12,
      878
  ],
  title: Star Wars: The Rise of Skywalker,
  vote_average: 6.6,
  overview: The surviving Resistance faces the First Order once again as the journey of Rey, Finn and Poe Dameron continues. With the power and knowledge of generations behind them, the final battle begins.,
  release_date: 2019-12-18
}
*/