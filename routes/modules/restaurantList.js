const express = require('express')
const router = express.Router()
const restaurants = require('../../models/restaurants')

// routing: create new items form
router.get('/new', (req, res) => {
  res.render('new')
})

// routing: create new items
router.post('/', (req, res) => {
  const contents = req.body
  const userId = req.user._id
  restaurants.create(userId, contents, (error, newItem) => {
    if (error) {
      console.log(error)
      return res.render('error', { error_message: error.message })
    }
    if (!newItem) {
      console.log("Couldn't save restaurant!")
      return res.end()
    }
    if (!newItem._id) {
      console.log(`No ${newItem._id} found`)
      return res.end()
    }
    res.redirect(`/restaurants/${newItem._id}`)
  })
})

// routing for each item
router.get('/:_id', (req, res) => {
  const _id = req.params._id
  const userId = req.user._id
  restaurants
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => {
      console.log(error)
      res.render('error', { error_message: error.message })
    })
})

// routing: edit items
router.get('/:_id/edit', (req, res) => {
  const _id = req.params._id
  const userId = req.user._id
  restaurants
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => {
      console.log(error)
      res.render('error', { error_message: error.message })
    })
})

router.put('/:_id', (req, res) => {
  const _id = req.params._id
  const contents = req.body
  const userId = req.user._id
  return restaurants
    .findOne({ _id, userId })
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
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => {
      console.log(error)
      res.render('error', { error_message: error.message })
    })
})

// routing: delete items
router.delete('/:_id', (req, res) => {
  const _id = req.params._id
  const userId = req.user._id
  return restaurants
    .findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => {
      console.log(error)
      res.render('error', { error_message: error.message })
    })
})

module.exports = router
