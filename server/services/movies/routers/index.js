const Controller = require('../controllers')
const express = require('express')
const router = express.Router()

router.get('/movies', Controller.readAll);

router.post('/movies', Controller.add);

router.get('/movies/:id', Controller.readOne);

router.patch('/movies/:id', Controller.update);

router.delete('/movies/:id', Controller.getDelete);

module.exports = router