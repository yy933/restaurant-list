const express = require('express')
const router = express.Router()
const restaurantList = require('./modules/restaurantList')
const home = require('./modules/home')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')

router.use('/restaurants', authenticator, restaurantList)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router
