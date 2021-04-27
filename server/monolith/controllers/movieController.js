const Movie = require('../models/Movie');

class MovieController {
  static home (req, res ,next) {
    res.status(200).json({message: 'Ini halaman home'})
  }

  static readAll (req, res, next) {
    Movie.findAll()
      .then(movies => res.status(200).json(movies))
      .catch(err => next(err))
  }

  static add (req, res, next) {
    const { title, overview, poster_path, popularity, tags} = req.body
    const splitTags = tags.split(',');
    const trimTags = splitTags.map(el => el.trim())
    const newMovie = {
      title,
      overview,
      poster_path,
      popularity,
      tags: trimTags
    }
    Movie.create(newMovie)
      .then(movie => {
        res.status(200).json(movie)
      })
      .catch(err => {
        next(err)
      })
  }

  static update (req,res,next) {
    const { title, overview, poster_path, popularity, tags} = req.body
    const splitTags = tags.split(',');
    const trimTags = splitTags.map(el => el.trim())
    const newMovie = {
      title,
      overview,
      poster_path,
      popularity,
      tags: trimTags
    }
    const {id} = req.params
    Movie.update(id, newMovie)
     .then(() => {
       res.status(201).json({message: 'success update'})
     })
     .catch(err => {
       next(err)
     })
  }

  static getDelete (req, res, next) {
    const id = req.params.id
    Movie.delete(id)
      .then(() => {
        res.status(200).json({message: 'success Delete'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = MovieController