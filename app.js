// include express from node modules
const express = require('express')
// include mongoose from node modules
const mongoose = require('mongoose')
// include restaurants model
const restaurants = require('./models/restaurants')
// include body parser
const bodyParser = require('body-parser')
// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
// server related variables
const port = 3000

// Load the handlebars module
const exhbs = require('express-handlebars')
// set handlebars configurations
app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
// set the app to use the handlebars engine
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// Use body parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting routing: requests and responses
app.get('/', (req, res) => {
  restaurants
    .find()
    .lean()
    .then((restaurantsData) => res.render('index', { restaurantsData }))
    .catch(err => console.log(err))
})
/// routing: searching
app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  restaurants.find({})
    .lean()
    .then((restaurantsData) => {
      const restaurants = restaurantsData.filter(
        (element) =>
          element.name.toLowerCase().includes(keyword) ||
      element.name_en.toLowerCase().includes(keyword) ||
      element.category.includes(keyword)
      )
      res.render('index', { restaurantsData: restaurants, keyword })
    }
    )
    .catch(error => console.log(error))
})

/// routing for each item
app.get('/restaurants/:_id', (req, res) => {
  const id = req.params._id
  restaurants.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// routing: create new items form
app.get('/new', (req, res) => {
  res.render('new')
})

// routing: create new items
app.post('/restaurants', (req, res) => {
  restaurants.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// routing: edit items
app.get('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  restaurants
    .findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.post('/restaurants/:_id/edit', (req, res) => {
  const id = req.params._id
  const contents = req.body
  return restaurants.findById(id)
    .then((restaurant) => {
      restaurant.name = contents.name
      restaurant.name_en = contents.name_en
      restaurant.category = contents.category
      restaurant.image = contents.image
      restaurant.location = contents.location
      restaurant.phone = contents.phone
      restaurant.google_map = contents.google_map
      restaurant.rating = contents.rating
      restaurant.description = contents.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// routing: delete items
app.post('/restaurants/:_id/delete', (req, res) => {
  const id = req.params._id
  return restaurants.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// launching and listening the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
