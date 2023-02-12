const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require("bcryptjs");
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '請填寫必要資訊！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      // if not registered, create a new account
      return bcrypt
        .genSalt(10) 
        .then((salt) => bcrypt.hash(password, salt)) 
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash, 
          })
        )
        .then(() => res.redirect('/'))
        .catch((error) => {
          console.log(error)
          res.render('error', { error_message: error.message })
        })
    })
    .catch((err) => console.log(err))
})
module.exports = router
