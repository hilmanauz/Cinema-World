const { gql } = require('apollo-server')

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  input MovieInput {
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  type MovieMessage {
    message: String
  }

  type TvSeries {
    _id: ID
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }
  
  input SeriesInput {
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }
  
  type SeriesMessage {
    message: String
  }

  type Query {
    movies: [Movie],
    movie(_id: ID): Movie,
    tvSeriess: [TvSeries],
    tvSeries(_id: ID): TvSeries
  }
  
  type Mutation {
    addMovie(movie: MovieInput): Movie
    updateMovie(_id: ID, movie: MovieInput): MovieMessage
    deleteMovie(_id: ID) : MovieMessage
    addSeries(series: SeriesInput): TvSeries
    updateSeries(_id: ID, series: SeriesInput): SeriesMessage
    deleteSeries(_id: ID) : SeriesMessage
  }
`;

module.exports = typeDefs