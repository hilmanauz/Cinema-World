const { MongoClient } = require('mongodb');

let getDatabase = null

function connectMongodb (cb) {
  const uri = 'mongodb://localhost:27017'

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  client.connect()
    .then(_ => {
      cb(true)
      getDatabase = client.db('entertainme')
    })
    .catch(err => {
      cb(false)
      console.log('connect mongodb error !')
      console.log(err)
    })
}

function database () {
  return getDatabase
}

module.exports = {
  connectMongodb,
  database
}
