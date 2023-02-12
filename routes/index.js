const express = require('express')
const router = express.Router()
const restaurantList = require('./modules/restaurantList')
const home = require('./modules/home')
const users = require('./modules/users')
router.use('/', home)
router.use('/restaurants', restaurantList)
router.use('/users', users)
module.exports = router
