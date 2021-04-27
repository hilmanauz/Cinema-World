const Controller = require('../controllers/movieController')
const express = require('express')
const router = express.Router()

router.get('/', Controller.readAll);

router.post('/', Controller.add);

router.patch('/:id', Controller.update);

router.delete('/:id', Controller.getDelete);

module.exports = router