const axios = require('axios');
const movieUrl = 'http://localhost:4001/movies';
const seriesUrl = 'http://localhost:4002/tv';
const Redis = require('ioredis')
const redis = new Redis()

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const movieRedis = await redis.get('moviesOrches/allData')
        if (!movieRedis) {
          const {data} = await axios({
            url: movieUrl,
            method: 'GET'
          })
          redis.set('moviesOrches/allData', JSON.stringify(data))
          return data
        } else {
          return JSON.parse(movieRedis)
        }
      } catch (error) {
        return error
      }
    },
    tvSeriess: async () => {
      try {
        const seriesRedis = await redis.get('seriesOrches/allData')
        if (!seriesRedis) {
          const {data} = await axios({
            url: seriesUrl,
            method: 'GET'
          })
          redis.set('seriesOrches/allData', JSON.stringify(data))
          return data
        } else {
          return JSON.parse(seriesRedis)
        }
      } catch (error) {
        return error
      }
    },
    movie: async (_, args) => {
      const {_id} = args;
      try {
        const movieRedis = await redis.get(`moviesOrches/${_id}`)
        if (!movieRedis) {
          const {data} = await axios({
            url: movieUrl + `/${_id}`,
            method: 'GET'
          })
          redis.set(`moviesOrches/${_id}`, JSON.stringify(data))
          return data
        } else {
          return JSON.parse(movieRedis)
        }
      } catch (error) {
        return error
      }
    },
    tvSeries: async (_, args) => {
      const {_id} = args;
      try {
        const seriesRedis = await redis.get(`seriesOrches/${_id}`)
        if (!seriesRedis) {
          const {data} = await axios({
            url: seriesUrl + `/${_id}`,
            method: 'GET'
          })
          redis.set(`seriesOrches/${_id}`, JSON.stringify(data))
          return data
        } else {
          return JSON.parse(seriesRedis)
        }
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const newMovie = {
          title: args.movie.title,
          overview: args.movie.overview,
          poster_path: args.movie.poster_path,
          popularity: args.movie.popularity,
          tags: args.movie.tags.toString()
        }
        const {data} = await axios({
          url: movieUrl,
          method: 'POST',
          data: newMovie
        })
        redis.del('moviesOrches/allData')
        return data[0]
      } catch (error) {
        return error
      }
    },
    updateMovie: async (_, args) => {
      try {
        const {movie, _id} = args
        const updateMovie = {
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          popularity: movie.popularity,
          tags: movie.tags.toString()
        }
        const {data} = await axios({
          url: movieUrl + `/${_id}`,
          method: 'PATCH',
          data: updateMovie
        })
        redis.del(`moviesOrches/${_id}`)
        redis.del('moviesOrches/allData')
        return data
      } catch (error) {
        return error
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const {_id} = args
        const {data} = await axios({
          url: movieUrl + `/${_id}`,
          method: 'DELETE',
        })
        redis.del(`moviesOrches/${_id}`)
        redis.del('moviesOrches/allData')
        return data
      } catch (error) {
        return error
      }
    },
    addSeries: async (_, args) => {
      try {
        const newSeries = {
          title: args.series.title,
          overview: args.series.overview,
          poster_path: args.series.poster_path,
          popularity: args.series.popularity,
          tags: args.series.tags.toString()
        }
        const {data} = await axios({
          url: seriesUrl,
          method: 'POST',
          data: newSeries
        })
        redis.del('seriesOrches/allData')
        console.log(data)
        return data[0]
      } catch (error) {
        return error
      }
    },
    updateSeries: async (_, args) => {
      try {
        const {series, _id} = args
        const updateSeries = {
          title: series.title,
          overview: series.overview,
          poster_path: series.poster_path,
          popularity: series.popularity,
          tags: series.tags.toString()
        }
        const {data} = await axios({
          url: seriesUrl + `/${_id}`,
          method: 'PATCH',
          data: updateSeries
        })
        redis.del(`seriesOrches/${_id}`)
        redis.del('seriesOrches/allData')
        return data
      } catch (error) {
        return error
      }
    },
    deleteSeries: async (_, args) => {
      try {
        const {_id} = args
        const {data} = await axios({
          url: seriesUrl + `/${_id}`,
          method: 'DELETE',
        })
        redis.del(`seriesOrches/${_id}`)
        redis.del('seriesOrches/allData')
        return data
      } catch (error) {
        return error
      }
    }
  }
};

module.exports = resolvers