const express = require('express')
const router = express.Router()

const home = require('./module/home')
const todo = require('./module/todos')
const users = require('./module/users')
const auth = require('./module/auth')
const { authenticator } = require('../middleware/auth')

router.use('/todos', authenticator, todo)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
