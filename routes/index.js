const express = require('express')
const router = express.Router()

const home = require('./module/home')
const todo = require('./module/todos')

router.use('/', home)
router.use('/todos', todo)

module.exports = router
