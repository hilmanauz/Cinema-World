const { database } = require('../config/mongodb');
const { ObjectId } = require('mongodb')
const model = 'Movies'

class Movie {
  static findAll () {
    return database().collection(model).find().toArray()
  }

  static findOne (id) {
    return database().collection(model).findOne({"_id": ObjectId(id)})
  }
  
  static create (newMovie) {
    return database().collection(model).insertOne(newMovie)
  }

  static update (id, newMovie) {
    return database().collection(model).updateOne({"_id": ObjectId(id)}, {$set: newMovie}, { upsert: true })
  }

  static delete (id) {
    return database().collection(model).deleteOne({ "_id": ObjectId(id) })
  }
}

module.exports = Movie;