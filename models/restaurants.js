const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  location: { type: String },
  phone: { type: String, required: true },
  google_map: { type: String },
  rating: { type: Number, required: true },
  description: { type: String }
})
module.exports = mongoose.model('restaurants', restaurantSchema)
