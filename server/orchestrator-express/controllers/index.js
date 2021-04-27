const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()

class Controller {
    static async getAllData (req, res, next) {
        try {
            const entertainme = await redis.get('entertainme')
            if(!entertainme){
                const fetchData = [axios.get('http://localhost:3001/movies'), axios.get('http://localhost:3002/tv')]
                Promise.all(fetchData)
                .then( data => {
                    const cache = {
                        movies: data[0].data,
                        tvSeries: data[1].data
                    } 
                    console.log(cache)
                    redis.set('entertainme', JSON.stringify(cache))
                    res.status(200).json(cache)
                })
                .catch(err => {throw new Error(err)})
            } else {
                res.status(200).json(JSON.parse(entertainme))
            }
            
        } catch (error) {
            res.status(500).json(err)
        }
    }
}

module.exports = Controller