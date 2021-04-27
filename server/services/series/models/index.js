const { database } = require('../config/mongodb');
const { ObjectId } = require('mongodb')
const model = 'TvSeries'

class Series {
  static findAll () {
    return database().collection(model).find().toArray()
  }

  static findOne (id) {
    return database().collection(model).findOne({"_id": ObjectId(id)})
  }
  
  static create (newSeries) {
    return database().collection(model).insertOne(newSeries)
  }

  static update (id, newSeries) {
    return database().collection(model).updateOne({"_id": ObjectId(id)}, {$set: newSeries}, { upsert: true })
  }

  static delete (id) {
    return database().collection(model).deleteOne({ "_id": ObjectId(id) })
  }
}

module.exports = Series;