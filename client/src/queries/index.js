import {gql} from '@apollo/client'

export const GET_ALL_DATA = gql`
query getMoviesAndSeries{
  movies {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
  tvSeriess {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const GET_MOVIES = gql`
query getMovies{
  movies {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const GET_SERIESS = gql`
query getSeries{
  tvSeriess {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const GET_MOVIE = gql`
query getMovie ($movieId: ID){
  movie (_id: $movieId) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const GET_SERIES = gql`
query getSeries ($movieId: ID){
  tvSeries (_id: $movieId) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const ADD_MOVIE = gql`
mutation addMovie($newMovie: MovieInput) {
  addMovie(movie: $newMovie) {
    _id
    title
    overview
    poster_path
    popularity
    tags
  }
}
`

export const DELETE_MOVIE = gql`
mutation deleteMovie($movieId: ID) {
  deleteMovie(_id: $movieId) {
    message
  }
}
`

export const UPDATE_MOVIE = gql`
mutation updateMovie($movieId: ID, $editMovie: MovieInput) {
  updateMovie(_id: $movieId, movie: $editMovie) {
    message
  }
}
`