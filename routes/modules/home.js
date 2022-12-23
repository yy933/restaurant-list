const express = require('express')
const router = express.Router()

// include restaurants model
const restaurants = require('../../models/restaurants')

router.get("/", (req, res) => {
  restaurants
    .find()
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((error) => {
      console.log(error);
      res.render("error", { error_message: error.message });
    });
});

// routing: searching
router.get("/search", (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/");
  }
  const keyword = req.query.keyword.trim().toLowerCase();
  restaurants
    .find({})
    .lean()
    .then((restaurantsData) => {
      const restaurants = restaurantsData.filter(
        (element) =>
          element.name.toLowerCase().includes(keyword) ||
          element.name_en.toLowerCase().includes(keyword) ||
          element.category.includes(keyword)
      );
      res.render("index", { restaurantsData: restaurants, keyword });
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error_message: error.message });
    });
});      

// routing: sort
router.get('/sort', (req, res)=>{
  const sortMethod = req.query.sortMethod
  let sortBy;
  if (sortMethod === "A -> Z") {
    sortBy = { name_en: "asc"};
  }
  if (sortMethod === "Z -> A"){
    sortBy = { name_en: "desc"}
  }
  if (sortMethod === "推薦指數:高至低") {
    sortBy = { rating: "desc" };
  }
  if (sortMethod === "推薦指數:低至高") {
    sortBy = { rating: "asc" };
  }
  restaurants
    .find()
    .lean()
    .sort(sortBy)
    .then(restaurantsData => res.render('index', {restaurantsData, sortMethod}))
    .catch((error) => {
      console.log(error);
      res.render("error", { error_message: error.message });
    });
})
module.exports = router