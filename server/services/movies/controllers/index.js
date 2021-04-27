const Movie = require('../models');
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {
  static async readAll (req, res, next) {
    try {
      const moviesRedis = await redis.get('moviesService/allData')
      if (!moviesRedis){
        Movie.findAll()
          .then(movies => {
            redis.set('moviesService/allData', JSON.stringify(movies))
            res.status(200).json(movies)
          })
          .catch(err => next(err))
      } else {
        res.status(200).json(JSON.parse(moviesRedis))
      }
    } catch (error) {
      next(error)
    }
  }

  static async readOne (req, res, next) {
    try {
      const movieRedis = await redis.get(`moviesService/${req.params.id}`)
      if(!movieRedis){
        Movie.findOne(req.params.id)
          .then(movie => {
            redis.set(`moviesService/${req.params.id}`, JSON.stringify(movie))
            res.status(200).json(movie)
          })
          .catch(err => next(err))
      } else {
        res.status(200).json(JSON.parse(movieRedis))
      }
    } catch (error) {
      next(error)
    }
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
        redis.del('moviesService/allData')
        res.status(200).json(movie.ops)
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
     .then(data => {
       redis.del(`moviesService/${req.params.id}`)
       redis.del('moviesService/allData')
       res.status(201).json({message: 'Success Update'})
     })
     .catch(err => {
       next(err)
     })
  }

  static getDelete (req, res, next) {
    const id = req.params.id
    Movie.delete(id)
      .then(() => {
        redis.del(`moviesService/${req.params.id}`)
        redis.del('moviesService/allData')
        res.status(200).json({message: 'Success Delete'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = MovieController