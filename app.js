// include express from node modules
const express = require('express')
const app = express()
// server related variables
const port = 3000
// load restaurant list json file
const restaurantList = require('./restaurantList.json')
// Load the handlebars module
const exhbs = require('express-handlebars')
// set handlebars configurations
app.engine('handlebars', exhbs.engine({defaultLayout: 'main'}))
// set the app to use the handlebars engine
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))
// setting routing: requests and responses
app.get('/',  (req, res)=>{
  res.render('index', {restaurants: restaurantList.results})
})
///routing for each item
app.get('/restaurants/:restaurant_id', (req, res)=>{
  const restaurant = restaurantList.results.find(element => element.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurant: restaurant})
});

///routing: searching
app.get('/search', (req, res)=>{
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(element => element.name.toLowerCase().includes(keyword) || element.name_en.toLowerCase().includes(keyword))
  res.render('index', {restaurants: restaurants, keyword: keyword})
});
// launching and listening the server
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`);
}) 