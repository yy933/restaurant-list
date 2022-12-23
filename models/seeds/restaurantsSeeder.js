const restaurants = require('../restaurants') // 載入 restaurant model
const restaurantList = require('../../restaurantList.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('mongodb connected!')
  restaurants.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(error => console.log(error))
})
