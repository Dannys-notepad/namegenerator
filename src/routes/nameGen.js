const express = require('express')
const router = express.Router()
const generate = require('../controllers/api.controller.js')
const mode = require('../middlewares/mode.js')

router.get('/', mode, generate)

module.exports = router