const express = require('express')
const router = express.Router()
const restaurantList = require('./modules/restaurantList')
const home = require('./modules/home')

router.use('/', home)
router.use('/restaurants', restaurantList)

module.exports = router
