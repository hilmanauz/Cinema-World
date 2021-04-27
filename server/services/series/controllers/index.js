const Series = require('../models');
const Redis = require('ioredis')
const redis = new Redis()

class SeriesController {
  static async readAll (req, res, next) {
    try {
      const seriesRedis = await redis.get('seriesService/allData')
      if(!seriesRedis){
        Series.findAll()
          .then(series => {
            redis.set('seriesService/allData', JSON.stringify(series))
            res.status(200).json(series)
          })
          .catch(err => next(err))
      } else {
        res.status(200).json(JSON.parse(seriesRedis))
      }
    } catch (error) {
      next(error)
    }
  }

  static async readOne (req, res, next) {
    try {
      const seriesRedis = await redis.get(`seriesService/${req.params.id}`)
      if(!seriesRedis){
        Series.findOne(req.params.id)
          .then(series => {
            redis.set(`seriesService/${req.params.id}`, JSON.stringify(series))
            res.status(200).json(series)
          })
          .catch(err => next(err))
      } else {
        res.status(200).json(JSON.parse(seriesRedis))
      }
    } catch (error) {
      next(error)
    }
  }

  static async add (req, res, next) {
    const { title, overview, poster_path, popularity, tags} = req.body
    const splitTags = tags.split(',');
    const trimTags = splitTags.map(el => el.trim())
    const newSeries = {
      title,
      overview,
      poster_path,
      popularity,
      tags: trimTags
    }
    Series.create(newSeries)
      .then(Series => {
        redis.del('seriesService/allData')
        res.status(200).json(Series.ops)
      })
      .catch(err => {
        next(err)
      })
  }

  static async update (req,res,next) {
    const { title, overview, poster_path, popularity, tags} = req.body
    const splitTags = tags.split(',');
    const trimTags = splitTags.map(el => el.trim())
    const newSeries = {
      title,
      overview,
      poster_path,
      popularity,
      tags: trimTags
    }
    const {id} = req.params
    Series.update(id, newSeries)
      .then(() => {
          redis.del(`seriesService/${req.params.id}`)
        redis.del('seriesService/allData')
          res.status(201).json({message: 'success update'})
      })
      .catch(err => {
        next(err)
      })
  }

  static async getDelete (req, res, next) {
    const id = req.params.id
    Series.delete(id)
      .then(() => {
        redis.del(`seriesService/${req.params.id}`)
        redis.del('seriesService/allData')
        res.status(200).json({message: 'success Delete'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = SeriesController