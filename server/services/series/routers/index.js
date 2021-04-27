const Controller = require('../controllers')
const express = require('express')
const router = express.Router()

router.get('/tv', Controller.readAll);

router.post('/tv', Controller.add);

router.get('/tv/:id', Controller.readOne);

router.patch('/tv/:id', Controller.update);

router.delete('/tv/:id', Controller.getDelete);

module.exports = router