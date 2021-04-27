const express = require('express')
const router = express.Router();
const Controller = require('../controllers')

router.get('/entertainme', Controller.getAllData)

module.exports = router