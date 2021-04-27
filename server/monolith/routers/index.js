const express = require('express')
const router = express.Router();
const moviesRouter = require('./movies')
// const tvSeriesRouter = require('./tvSeries')

router.use('/movies', moviesRouter)

// router.use('/tvseries', tvSeriesRouter)

module.exports = router