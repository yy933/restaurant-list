const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurants = require('../restaurants') // 載入 restaurant model
const User = require('../user')
const restaurantList = require('../../restaurantList.json').results
const db = require('../../config/mongoose')
const SEED_USER = [{
  name: 'seedUser1',
  email: 'user1@example.com',
  password: '12345678',
  restaurantListIndex: [0, 1, 2]
},
{
  name: 'seedUser2',
  email: 'user2@example.com',
  password: '12345678',
  restaurantListIndex: [3, 4, 5]
}]

db.once('open', () => {
  console.log('mongodb connected!')
  Promise.all(Array.from({ length: 2 }, (_, i) =>
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(SEED_USER[i].password, salt))
      .then((hash) => User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      }))
      .then((user) => {
        const restaurantData = SEED_USER[i].restaurantListIndex.map(index => {
          const userData = restaurantList[index]
          userData.userId = user._id
          return userData
        })
        return restaurants.create(restaurantData)
      })
      .catch(error => console.log(error))
  )
  )
    .then(() => {
      console.log('restaurantSeeder done!')
      process.exit()
    })
})
