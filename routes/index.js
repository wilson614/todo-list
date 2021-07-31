const express = require('express')
const router = express.Router()

const home = require('./module/home')
const todo = require('./module/todos')
const users = require('./module/users')

router.use('/', home)
router.use('/todos', todo)
router.use('/users', users)

module.exports = router
